import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Modes} from "../../shared/app-enums";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookRepository} from "../shared/book.repository";
import { Book, BookSeller } from '../shared/book';
import {BookValidator} from "../../validators/BookValidator";
import { NGXLogger } from 'ngx-logger';
import {
  InputText} from 'primeng/inputtext';
 
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {

  ModesEnum = Modes;  // ez js module és nam angular module ezért nem kell egy ng modulban sem importálni
  modes: Modes = Modes.create;
  bookForm: FormGroup;
  book: Book;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private fb: FormBuilder, private bookRepo: BookRepository, private logger: NGXLogger) {
    this.modes = Number(activeRoute.snapshot.paramMap.get("mode"));
   }

  ngOnInit(): void {
   this.initForm();  // meg kell hivni mert a template már renderelve lehet mire a REST response megjön és a [fromGroup] egy undefined objectre mutat

   this.logger.error("logging BookDetailsComponent");

   if (this.modes === Modes.edit) {
      const id = this.activeRoute.snapshot.paramMap.get("id");
      this.bookRepo.getBook(id).subscribe(data =>  {  // a subscription ban kell a formgroupot inicializálni, mert meg kell várni a async REST
                                                     // hivás eredményét
        this.book = data;
        this.initForm(this.book);
      })
    } 
  }

  private initForm(book?: Book): void {
    this.bookForm = this.fb.group({
      id: [book?.isbn],
      isbn: [{value: book?.isbn, disabled: this.modes == Modes.edit}, Validators.minLength(3)],
      title: [book?.title, [Validators.minLength(3), BookValidator.titleFormat]],
      subtitle: [book?.subtitle],
      published: [book?.published],
      rating: [book?.rating, Validators.minLength(3)],
      //sellers: (book === undefined || book.sellers === undefined )? [] : this.fb.array(this.createSellerGroups(book?.sellers))
      // vagy ugyanez 
      sellers: this.fb.array( (!book || !book?.sellers) ? [] : this.createSellerArray(book.sellers), {validators: BookValidator.ageAndYearCorrect} ), // array of FormGroups containing FormControll objects
      authors: ( (!book || !book?.authors) ? [] : this.createAuthorsArray(book.authors))  //itt mivel nem gropuba hanem egyből FormControllert
      // használok nem megy valamiért a FormBuilder.array, helyette manuálisan állitom össze!
    });
  }

  get authors(): AbstractControl[] {
    return (this.bookForm.get('authors') as FormArray).controls;
  }

  get sellers(): AbstractControl[] {
    return (this.bookForm.get('sellers') as FormArray).controls;
  }

  createAuthorsArray(values?: string[]): FormArray {
    const array: FormArray = new FormArray([]);
    values.forEach(v => {
      array.push(new FormControl(v));
    });
    return array;
  }

  createSellerArray(sellers: BookSeller[]): FormGroup[] {
    const sellerGroups: FormGroup[] = [];
    sellers.forEach(s => {
      sellerGroups.push(
        this.createSellerGroup(s)
      );
    });
    return sellerGroups;
  }

  private createSellerGroup(s?: BookSeller): FormGroup {
    return  this.fb.group({
      name: s?.name,
      address: s?.address,
      quantity: s?.quantity,
      age:  s?.age,
      birthYear: s?.birthYear
     }, {validators: BookValidator.ageAndYearCorrect})
  }

  addSeller() {
    const sellers = this.bookForm.get("sellers") as FormArray;
    sellers.push(this.createSellerGroup());
  }

  deleteSeller(index: number ) {
    const sellers = this.bookForm.get("sellers") as FormArray;
    sellers.removeAt(index);
  }

  addAuthor() {
    this.authors.push(new FormControl(''));
  }

  submitForm() {
    if(this.bookForm.valid) {

      // kiszűrni ha a user üres seller sorokat adott hozzá
     const sellers = this.bookForm.value.sellers.filter((seller: BookSeller) => (seller.address != null && seller.name != null && seller.quantity != 0));
     const authors = this.bookForm.value.authors;

      const mybook: Book = {
        ...this.bookForm.value,
        id: this.bookForm.get("isbn").value,
        isbn: this.bookForm.get("isbn").value,
        sellers,
        authors
      };

      if(this.modes == Modes.edit) {
          this.bookRepo.updateBook(mybook).subscribe(data => 
            this.router.navigateByUrl("/book/list")
            );
      } else {
          this.bookRepo.saveBook(mybook).subscribe(data => 
            this.router.navigateByUrl("/book/list"))
      }
    }
  }
    
}

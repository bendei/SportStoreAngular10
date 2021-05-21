import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Modes} from "../../shared/app-enums";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookRepository} from "../shared/book.repository";
import { Author, Book, BookSeller } from '../shared/book';
 

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  ModesEnum = Modes;  // ez js module és nam angular module ezért nem kell egy ng modulban sem importálni
  modes: Modes = Modes.create;
  bookForm: FormGroup;
  book: Book;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private fb: FormBuilder, private bookRepo: BookRepository) {
    this.modes = Number(activeRoute.snapshot.paramMap.get("mode"));
   }

  ngOnInit(): void {
   this.initForm();  // meg kell hivni mert a template már renderelve lehet mire a REST response megjön és a [fromGroup] egy undefined objectre mutat

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
      isbn: [book?.isbn, Validators.required],
      id: [book?.isbn],
      title: [book?.title],
      subtitle: [book?.subtitle],
      published: [book?.published],
      rating: [book?.rating],
      //sellers: (book === undefined || book.sellers === undefined )? [] : this.fb.array(this.createSellerGroups(book?.sellers))
      // vagy ugyanez 
      sellers: this.fb.array( (!book || !book?.sellers) ? [] : this.createSellerGroups(book.sellers) ), // array of FormGroups containing FormControll objects
      //authors: this.fb.array( (!book || !book?.authors) ? [] : this.buildAuthorsArray(book.authors) )
      authors: this.createAuthorsArray(["1","2"])
    });
  }

  createAuthorsArray(values: string[]): FormArray {
    // return new FormArray([
    //   new FormControl('qqq'),
    //   new FormControl('dddd'),
    //   new FormControl('fggg'),
    // ])

    let array: FormArray = new FormArray([]);
    values.forEach(v => {
      array.push(new FormControl(v));
    });

    return array;
  }
 

  createSellerGroups(sellers: BookSeller[]): FormGroup[] {
    let sellerGroups: FormGroup[] = [];
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
      quantity: s?.quantity
     })
  }

 

  addSeller() {
    const sellers = this.bookForm.get("sellers") as FormArray;
    sellers.push(this.createSellerGroup());
  }

  deleteSeller(index: number ) {
    const sellers = this.bookForm.get("sellers") as FormArray;
    sellers.removeAt(index);
  }

  submitForm() {

    if(this.bookForm.valid) {

      // kiszűrni ha a user üres seller sorokat adott hozzá
     const sellers = this.bookForm.value.sellers.filter((seller: BookSeller) => (seller.address != null && seller.name != null && seller.quantity != 0));

     

      const mybook: Book = {
        ...this.bookForm.value,
        id: this.bookForm.get("isbn").value,
        sellers
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

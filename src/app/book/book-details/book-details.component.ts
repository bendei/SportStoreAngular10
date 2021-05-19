import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Modes} from "../../shared/app-enums";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookRepository} from "../shared/book.repository";
import { Book, BookSeller } from '../shared/book';
 

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
    //this.bookForm = this.fb.group({});
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
      authors: this.fb.array(["q","w"]),
      //sellers: (book === undefined || book.sellers === undefined )? [] : this.fb.array(this.createSellerGroups(book?.sellers))
      // vagy ugyanez 
       sellers: this.fb.array( (!book || !book?.sellers) ? [] : this.createSellerGroups(book.sellers) )
    });
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
    let sellers = this.bookForm.get("sellers") as FormArray;
    sellers.push(this.createSellerGroup());
  }

  submitForm() {
    if(this.bookForm.valid) {

      const ez = this.bookForm.value;

      const mybook: Book = {
        ...this.bookForm.value,
        id: this.bookForm.get("isbn").value
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

import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../shared/book';
import {Modes} from "../../shared/app-enums";

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent {

  ModesEnum = Modes;  // ez js module és nam angular module ezért nem kell egy ng modulban sem importálni

  @Input()
  book: Book;

  @Input()
  index: number;

  constructor(private router: Router) { }

  selectBook(selectedBook: Book) {
    this.router.navigateByUrl("/book/details");
  }

  get bookStyleMap() {
    return {
      "color": (this.index % 2 == 0) ? "white" : "black",
      "background-color": (this.index % 2 == 0) ? "grey" : "lightgrey",
     
    };
  }

  get linkTextColor(): string {
    return (this.index % 2 == 0) ? "wheat" : "black";
  }

}

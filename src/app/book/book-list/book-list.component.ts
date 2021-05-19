import { Component, OnInit } from '@angular/core';
import { BookRepository } from '../shared/book.repository';
import { Book } from '../shared/book';
import {Modes} from "../../shared/app-enums";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  ModesEnum = Modes;  // must assign enum to public field so that it can be used in the template // ez js module és nam angular module ezért nem kell egy ng modulban sem importálni

  constructor(private repo: BookRepository) { }

  ngOnInit(): void {
    //setTimeout( () => {this.repo.getBooks().subscribe(data => this.books = data)}, 1400);
    this.repo.getBooks().subscribe(data => this.books = data);
  }
      

}

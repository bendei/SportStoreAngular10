import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import {RestDataSource} from "../../shared/rest.datasource";
import { Book } from "./book";

@Injectable({
    providedIn: "root"
})
export class BookRepository {

    constructor(private ds: RestDataSource) {}

    getBook(id: string): Observable<Book> {
        return this.ds.getBook(id);
    }

    getBooks(): Observable<Book[]> {
        return this.ds.getBooks();
    }

    saveBook(book: Book): Observable<Book> {
        return this.ds.saveBook(book);
    }

    updateBook(book: Book): Observable<Book> {
        return this.ds.updateBook(book);
    }

    deleteBook(isbn: string): Observable<any> {
        return this.ds.deleteBook(isbn);
    }

}
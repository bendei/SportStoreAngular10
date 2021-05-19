import {Book} from "../shared/book";

export class BookFactory {

    static convertBook(rawBook: Book): Book {
        return {
            ...rawBook,
            published: new Date(rawBook.published)
        };
    }

}
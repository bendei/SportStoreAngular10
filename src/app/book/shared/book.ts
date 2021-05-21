import { Thumbnail } from "./thumbnail";

export interface Book {
    id: string;
    isbn: string;
    title: string;
    authors: Author[];
    sellers: BookSeller[];
    published: Date;
    subtitle?: string;
    rating?: number;
    thumbnails?: Thumbnail[];
    description?: string;
}

export interface BookSeller {
    name: string;
    address: string;
    quantity: number;
}

export interface Author {
    name: string;
}
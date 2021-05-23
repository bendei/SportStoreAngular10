import { Thumbnail } from "./thumbnail";

export interface Book {
    id: string;
    isbn: string;
    title: string;
    authors: string[];
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
    age: number;
    birthYear: number;
}

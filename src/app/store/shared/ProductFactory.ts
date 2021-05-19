import { Product } from "./product";

export class ProductFactory {

    static convertRawToProduct(p: Product): Product {
        return {
            ...p,
            name: p.name,
            releaseDate: new Date(p.releaseDate)
        };
    }

}
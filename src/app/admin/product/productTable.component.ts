import {Component, OnInit} from "@angular/core";
import {ProductRepository} from "../model/product.repository";
import {Product} from "../model/product.model";

@Component({
    templateUrl: "productTable.component.html"
})
export class ProductTableComponent implements OnInit{
    public products: Product[] = [];

    constructor(private productRepo: ProductRepository) {}

    ngOnInit(): void {
        this.productRepo.getProducts().subscribe(data => {
            this.products = data;
        });

        console.log();
    }

    delete(productID: number) {
        this.productRepo.deleteProduct(productID).subscribe();
        this.productRepo.getProducts().subscribe(data => this.products = data);
    }

}
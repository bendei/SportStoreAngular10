import {Component, Output, OnInit} from "@angular/core";
import {Product} from "../store/shared/Product";
import {ProductRepository} from "../store/shared/product.repository";

@Component({
    templateUrl: "inputOutputParent.component.html"
})
export class InputOutputParentComponent {

    // table child comp kapja meg mint @Input
    products: Product[] = [];

    // form child comp kapja meg mint @Input
    categories: string[] = [];

    receivedProductFromTable: Product;

    constructor(private repo: ProductRepository) {        
    }

    ngOnInit(): void {
        this.repo.getProducts().subscribe(data => {
            this.products = data;
            // ne rakd a subscriben kivul, mert nem biztos hogy adataot kap a RESTol időben!!
            this.categories =  this.products.map(x => x.category).filter((c, index, sor) => sor.indexOf(c) == index);
            this.categories.unshift("Kérem válasszon");
            }
        );
    }    

    addProduct(product: Product) {
       // this.nevek.push(product);

        // this.nevek.forEach(x => {
        //     console.log(x);
        // });

        // objektumokkal -> FIGYELEM !! ha nem hozok létre új objektumot, hanem a outputkent megkapottat pusholom, az nem jó, mert valahogy mindig felülirja a már pusholtz objektumokat!!!
        // let uj = {
        //     name: product.name,
        //     category: product.category,
        //     price: product.price
        // };

        // cloning the product object
        let clonedProduct: Product = {};
        Object.assign(clonedProduct, product);
        this.products.push(clonedProduct);

        // this.products.forEach(p => {
        //     console.log(p.name);
        // });
    }

    // a table egy sorára kattintva a parent megkapja a kiválasztott productot amit a form component vesz át és majd tölt be 
    receiveSelectedProduct(prod: Product) {
        console.log("parent comp received the product from table comp:" + prod.name);
        this.receivedProductFromTable = prod;
    }
}
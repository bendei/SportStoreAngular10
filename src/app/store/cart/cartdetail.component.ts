import { Component } from "@angular/core";
import { Cart } from "../shared/cart.model";

@Component({
    templateUrl: "cartDetails.component.html"
}    
)
export class CartDetailComponent {

    constructor(public cart: Cart) {
        console.log(this.cart.cartPrice);
    }
}
import { Component } from "@angular/core";
import { Cart } from "../shared/cart.model";

@Component({
    selector: "cart-summary",
    templateUrl: "cart.component.html"
})
export class CartSummaryComponent {

    constructor(public cart: Cart) {}

    public clickmeCart() {
        console.log("clickmeCart() clicked");
    }
}
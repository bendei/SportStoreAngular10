import { Injectable} from "@angular/core";
import { Product } from "./product";

@Injectable({
    providedIn: "root"
})
export class Cart {

    public lines: CartLine[] = [];
    public itemCount: number = 0;
    public cartPrice: number = 0;

    addLine(product: Product, quantity: number = 1) {
        let line = this.lines.find(x => x.product.id == product.id);
        if(line == undefined) {
            this.lines.push(new CartLine(product, quantity));
        } else {
            line.quantity += quantity;
        }
        this.recalculate();
    }

    removeLine(id: number) {
        let index = this.lines.findIndex(x => x.product.id == id);
        this.lines.splice(index, 1);
        this.recalculate();
    }

    clear() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines = [];
        this.recalculate();
    }

    updateQuantity(quantity: number, id: number) {
        let quan = Number(quantity);
        let prodID = Number(id);
        let line = this.lines.find(x => x.product.id == prodID);
        if (line != undefined)  {
            line.quantity = quan;
        }
        this.recalculate();
    }
    
    private recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(x => {
            this.itemCount += x.quantity;
            this.cartPrice += (this.itemCount * x.product.price);
        });
    }

}

export class CartLine {

    constructor(public product: Product, public quantity: number) {}

    get lineTotal(): number {
        return this.product.price  * this.quantity;
    }
}
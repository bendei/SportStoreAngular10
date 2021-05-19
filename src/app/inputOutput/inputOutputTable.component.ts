import {Component, Input, Output, EventEmitter} from "@angular/core";
import { DatePipe } from "@angular/common";
import {Product} from "../store/shared/Product";

@Component({
    providers: [DatePipe],
    selector: "inputoutput-table",
    templateUrl: "inputOutputTable.component.html"
})
export class InputOutputTableComponent {

    @Input()
    newproduct: Product;

    @Input()
    products: Product[];

    @Output()
    productToSend = new EventEmitter<Product>();

    constructor() {
        console.log("InputOutputTableComponent constructor");
        
    }
    
    sendProductToParent(prod: Product) {
        console.log("table comp sent the product");
        this.productToSend.emit(prod);
    }

}
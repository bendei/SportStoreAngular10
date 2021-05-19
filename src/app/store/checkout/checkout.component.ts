import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Order } from "../shared/order.model";
import { OrderRepository } from "../shared/order.repository";

@Component({
    templateUrl: "checkout.component.html",
    styleUrls: ["checkout.component.css"]
})
export class CheckoutComponent {

    public submitted: boolean = false;
    public orderSent: boolean = false;

    constructor(public order: Order, public orderRepo: OrderRepository) {}

    submitOrder(form: NgForm) {
        this.submitted = true;

        if(form.valid) {
            
            this.orderRepo.saveOrder(this.order).subscribe(responseorder => {
                this.orderSent = true;
                this.submitted = false;
                console.log("checking out - placing order:" + responseorder.address);

                //responseorder.clear(); // ez nem fog menni (not a function) , mert a visszaadott order egy value objektum ami porpertyjei
                //ugyan mappali a HttpClient a type parameternek megfelelően, de nincsen ilyen funtionja
                
               this.order = responseorder;

                 // ha assign returned order to this.order akkor clear() not function
                //this.order.clear();
            });
        }
    }
}
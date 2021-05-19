import {Component, OnInit} from "@angular/core";
import { OrderRepository } from "../model/order.repository";
import {Order} from "../model/order.model";

@Component({
    templateUrl: "orderTable.component.html"
})
export class OrderTableComponent implements OnInit {
    orders: Order[] = [];
    onlyShipped: boolean = false;

    constructor(private repo: OrderRepository) {}
    
    ngOnInit(): void {
        this.repo.getOrders().subscribe(data => this.orders = data);
    }

    markShipped(order: Order) {
        order.shipped = true;
        this.repo.markShippedOrder(order).subscribe(data => 
            // nem REST hivást intézünk, hanem az updatelt ordert irjuk felül a arrayben: best practice!
            this.orders.splice(this.orders.findIndex(x => x.id == data.id), 1, data));
    }

    deleteOrder(id: number) {
        this.repo.deleteOrder(id).subscribe(deletedOrder => 
          this.orders.splice(this.orders.findIndex(x => x.id == id), 1 ));
    }
    
    getOrders(): Order[] {
        return this.orders.filter(order => this.onlyShipped == false || order.shipped == this.onlyShipped);
    }


}
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { RestDataSource } from "../../shared/rest.datasource";

@Injectable({
    providedIn: "root"
})
export class OrderRepository {

    constructor(public dataSource: RestDataSource) {}

    getOrders(): Observable<Order[]> {
        return this.dataSource.getOrders();
    }

    markShippedOrder(order: Order): Observable<Order> {
        return this.dataSource.markShippedOrder(order);
    }

    deleteOrder(id: number): Observable<Order> {
        return this.dataSource.deleteOrder(id);
    }

    saveOrder(order: Order): Observable<Order> {
        return this.dataSource.saveOrder(order);
    }

}
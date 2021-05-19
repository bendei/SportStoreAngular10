import { Injectable } from "@angular/core";
import {Cart} from "./cart.model";

@Injectable({
    providedIn: "root"
})
export class Order {

    public name?: string;
    public id?: number;
    public address?: string;
    public zip?: number;
    public city?: string;
    public country?: string;
    public sex?: string;
    public shipped?: boolean = false;
    public height?: number;

    constructor(public cart?: Cart) {}

}
import {Component} from "@angular/core";
import {Product} from "../model/product.model";
import {ProductRepository} from "../model/product.repository";
import {NgForm} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent {
    editing: boolean = false;
    public product: Product = new Product();

    constructor(private repo: ProductRepository, private router: Router,private activeRoute: ActivatedRoute) {
        //Object.assign(this.product, new Product());

        // router path param értéke alapján tudjuk hogy ha edit akkor betölt a kiválasztott product ha csak create akkor új product objektumot használunk
        
        //templatebn használjuk hogy a labelek edit vagy createk legyenek-e
        this.editing = this.activeRoute.snapshot.params["mode"] == "edit";
        
        if (this.activeRoute.snapshot.params["mode"] == "edit") {
            this.repo.getProduct(this.activeRoute.snapshot.params["id"]).subscribe(data => {
                this.product = data;
            });
        }
    }

    saveProduct(form: NgForm) {
        if(form.valid) {
            let mode = this.activeRoute.snapshot.params["mode"];

            if (mode == "edit") {
                let id = this.activeRoute.snapshot.params["id"];
                this.repo.updateProduct(this.product).subscribe(data => {});
            } else {
                let pp = this.repo.saveProduct(this.product).subscribe(data => data);
            }

            this.router.navigateByUrl("/admin/main/productTable");
        }
    }
}
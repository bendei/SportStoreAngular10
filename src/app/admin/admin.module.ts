import {NgModule} from "@angular/core";
import {AuthComponent} from "../authentication/auth.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { RouterModule } from "@angular/router";
 
// ERRATA
//1. no directive found with axportAs 'ngForm' in productEditor.component.html HIBA -> module declaration: ban elfelejtettem deklarálni aProductEditorComponent-t
//2.  Cannot assign to 'name' because it is a read-only property. -> a Product.model.ts ben nem volt meg ez  
    //    public set name(n: string) {
    //         this._name = n;
    //     }  

let routing = RouterModule.forChild([
    //{path: "auth", component: AuthComponent},

    {path: "main", component: AdminComponent, canActivate: [StoreGuard], 
        children: [ // amit a childrenben definiál component az a <router-outlet> ben jeleni meg (menü rendszerek létrehozása!)
        {path: "productTable", component: ProductTableComponent},
        {path: "orderTable", component: OrderTableComponent},
        {path: "products/:mode/:id", component: ProductEditorComponent},    // editing a existing product
        {path: "products/:mode", component: ProductEditorComponent}        // creating a new product
    ]},    
    {path: "**", redirectTo: "admin"}
]);
@NgModule({
    imports: [FormsModule, CommonModule, routing],
    declarations: [AuthComponent, AdminComponent, ProductTableComponent, OrderTableComponent, ProductEditorComponent],
    exports: [FormsModule]
})
export class AdminModule {
    
}
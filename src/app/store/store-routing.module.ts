import {NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartDetailComponent } from "./cart/cartdetail.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { StoreComponent } from "./store/store.component";

const routes: Routes = [
    {path: "home", component: StoreComponent},
    {path: "cart", component: CartDetailComponent},
    {path: "checkout", component: CheckoutComponent},
    {path: "**", redirectTo: "/"}
    ];

    // !! ezt a modult nem szabad importálni a main modulba, különben nem lazy loading lesz !!!
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreRoutingModule {
    
}
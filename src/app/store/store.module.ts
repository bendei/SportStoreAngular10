import {NgModule } from "@angular/core";
import {StoreComponent} from "./store/store.component";
import {CartSummaryComponent } from "../store/cart/cart.component";
import { CartDetailComponent } from "../store/cart/cartdetail.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    //szervizek, amiket ha a modulban regisztrálom, akkor az összes modulban regisztrált comp egyazon providert használ
    // ha a Cart-ot itt regisztrálom akkor az shared lesz az egész app-ban
    // they become accessible in all parts of the app. (You can also specify providers at the component level.)
    providers: [ ], 

    // Other modules whose exported classes are needed by component templates declared in this NgModule. 
    //(pl roterLinket akarom a templatebn használni akkor itt kell importálni)
    // importáljuk a modulokat, amik classjait a servicek, componensek hasznának az import directivákban
    imports: [SharedModule], 
        
    // Listinge components, directives, and pipes that belong to this NgModule
    declarations: [StoreComponent, CartSummaryComponent, CartDetailComponent, CheckoutComponent], 
    
     // hogy lehessen ezen komponenseket máshol is használni az appban
    exports: [], 
})
export class StoreModule { // export keyword, ami ezt a modult máshonnan is elérhetőve teszi

}
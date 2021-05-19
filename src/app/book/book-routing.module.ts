import {NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { BookListComponent } from "./book-list/book-list.component";


const routes: Routes = [
    {path: "list", component: BookListComponent},
    {path: "details/:mode/:id", component: BookDetailsComponent},
    {path: "details/:mode", component: BookDetailsComponent},
];

    // !! ezt a modult nem szabad importálni a main modulba, különben nem lazy loading lesz !!!

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class BookRoutingModule {
    
}
import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { StoreGuard } from "./authentication/store.guard";
import { AuthComponent } from "./authentication/auth.component";

//Routendefinitionen
const routes: Routes = [
    {path: "auth", component: AuthComponent},
    {path: "home", component: HomeComponent , canActivate: [StoreGuard]},
    {path: "store", // ez lesz a route prefix-je pl "/store/home"
        //  <!-- a children routok componentjeit ide tölti be: <router-outlet></router-outlet> "admin", lásd: admin module path main 
        loadChildren: () => import("./store/store-routing.module").then(m => m.StoreRoutingModule)
        , canActivate: [StoreGuard]},
    {path: "book",
      loadChildren: () => import("./book/book-routing.module").then(a => a.BookRoutingModule)
      , canActivate: [StoreGuard]
    },
    {path: "inputoutput",
      loadChildren: () => import("./inputOutput/inputoutput-routing.module").then(i => i.InputOutputRoutingModule)
    },
    
    // !!! a ** pathnak kell legutoljára jönnie különben az alatta levő path nem mux
    {path: "**", redirectTo: "home"}  // um die Navigation zu nicht bekannten URLs aubzufangen
   
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],  
  
    
})
export class AppRoutingModule {
    
}
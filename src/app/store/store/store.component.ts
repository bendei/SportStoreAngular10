import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map, filter, scan, share } from 'rxjs/operators';
import { Cart } from "../shared/cart.model";
import {ProductRepository} from "../shared/product.repository";
import {Product} from "../shared/product";

@Component({
    selector: "store",
    templateUrl: "store.component.html",
    providers: [] // minden egyes componenshez külön provider instance jön létre, 
    //  ha a modulban regisztrálom, akkor az összes modulban regisztrált comp egyazon providert használ
})

export class StoreComponent implements OnInit {
    public selectedCategory: string = null;
    public selectedPage: number = 1;
    public poructsPerPage: number = 3;
    public products: Product[];
    public categories: string[] = [];

    // using construcot argumnet based dependency injection (szemben a modulokkal itt nem kell regisztrálni a szerizeket
    // a provider metadata attibut-ban )
    // mivel itt dependency inj.-ral használom a Cart-ot, igy a child componentek is ugyanahhoz a Cart instancehoz férnek hozzá
    constructor(private repo: ProductRepository, private cart: Cart, private router: Router)  {
    }

    ngOnInit(): void {

        this.repo.getProducts().subscribe(data => this.products = data);

        // kalte Datenströme teilen mit share Operator: we have multiple subscribers to to same stram, but want the server to be hit only once
        // es wird nur ein einziger HTTP_Request ausgeführt
        // const productStream = this.repo.getProducts().pipe(share());

        // //this.repo.getProducts().subscribe(data => {
        // productStream.subscribe(data => {
        //     // jó leirás van a német könyvben
        //     // getProucts() gets an Observale back, we can subscribe to it by passing a Obeserver(Subscriber) as an argument to the subscribe method.
        //     // The Observer may implements 3 callback methods (must at least one) that gets called by the Observable
        //     // Observer= does not need to implement all 3 callbacks; Subscriber= wrapper for Observer, implements all 3 callbacks
        //     //damit wir die Daten vom Datenstrom bekommen, müssen wir das Observable abbonieren
        //     // Observables sind Funktionen, mit 
        //     this.products = data;
        //     this.categories = this.products.map(p => p.category).filter((c, index, sor) => sor.indexOf(c) == index);
        //     }
        // );

       //this.repo.getProducts().pipe(  // Damit wir einen Operator auf ein existierendes Observable anwenden
                                         // können, benutzen wir die Methode pipe().
        // productStream.pipe(             // map Operator (von RxJS) transformiert ein Array von Objekten. Um diese einzelne Objekte in
        //                                 // einzelne Product type Objecte zu umwandeln, müssen wir erneut über das Array laufen,
        //                                 // mit Array.map()

        //     map(rawProducts => rawProducts    // von Datenstrom erhalten wir zunaechsts ein Array von js Objekten die aber noch nicht
        //                                       // von Product Typ sind. diese erste map ist ein RxJS map Operator
        //       .map(rawProduct =>              // hier erstellen Objekte von Product Type aus Object Type, 
        //           {                           // diese map ist schon die native Methode von Array.map()!!
        //             let prod = {
        //                 name: rawProduct.name,
        //                 category: rawProduct.category,
        //                 description: rawProduct.description,
        //                 price: rawProduct.price,
        //                 releaseDate: rawProduct.releaseDate
        //             }
        //             return prod;

        //           }
        //       )
        //   )
        //  ).subscribe(data => {    // miveé itt már a Observable<Product[]> miatt tipusosan (Product[]) kapjuk vissza az adatokat nincs a
        //                           // fenti map-re szükség!!
        //     myProducts = data
        //     console.log("myPorducts:", myProducts);   
        // });
        
        // let secondObserver = {    //the 3 callback methods
        //     next: (value: any) => {
        //         console.log("next called on mySubscriber", value);
        //     },
        //     error: value => {
        //         console.log("error called on mySubscriber", value);
        //     },
        //     complete: () => {console.log("complete called on mySubscriber");}
        // };
        // this.repo.getProducts().subscribe(secondObserver);
      
        // const source1 = from([  
        //     { name: 'Alex', age: 32 },  
        //     { name: 'Akira', age: 25 },  
        //     { name: 'Aisha', age: 23 },  
        //     { name: 'Anisha', age: 16 },  
        //     { name: 'Anisha', age: 19 },  
        //     { name: 'Alisha', age: 22 }  
        //   ]);  
        //   const example1 = source1.pipe(filter(person => person.age <= 25));  
        //   example1.subscribe(val => console.log(`Under the age of 25: ${val.name}`));  

    }

    getProducts(): Product[] {
        let pageIndex = (this.selectedPage -1) * this.poructsPerPage;
        return this.products.filter(p => this.selectedCategory == null || p.category == this.selectedCategory).slice(pageIndex, pageIndex + this.poructsPerPage);
    }

    changePage(page: number) {
        this.selectedPage = page;
    }

    changePoructsPerPage(size: number) {
        this.poructsPerPage = Number(size);
        this.changePage(1);
    }

    get numberOfPages(): number[] {
        let pagek =  Math.floor(this.products.length / this.poructsPerPage);
        let pagekMod = pagek % 2 == 0 ? 0 : 1;
       return Array(pagek + pagekMod).fill(1).map((value, index) => index + 1);
    }

    changeCategory(ujcat?: string) {
       this.selectedCategory = ujcat;
    }

    public addProductToCart(product: Product) {
        this.cart.addLine(product);
        this.router.navigateByUrl("/store/cart");
    }

}
import { Injectable }  from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "src/app/shared/rest.datasource";
import { Product } from "./product";

@Injectable({
    providedIn: "root"
})
export class ProductRepository {
     private products: Product[] = [];
    // private categories: string[] = [];
    // private people: Person[] = [];

    // FIGYELEM!! nem szerencsés a repo propertijében tarolni a constructorban lekérdezett RESTes procts adataokat, mert ugyan mi a saját appunkon belül
    // push és splicejük a products array-t ( azaz updateljük a tartalmát), de ha a DB-ben eközben más app irja/törli a product táblát akkor mi anguklaros app-unk erről nem 
    // értesül mert a repo instacialásákaor csak egyszer kérdezzük le a DB-t REST-en keresztül!!
    // megoldás: component.ngOnInit() ben hivjuk meg !!
    constructor(private restDataSource: RestDataSource) {
        // restDataSource.getProducts().subscribe(data => {
        //     //this.products = data;
        //     this.categories = data.map(p => p.category).filter((c, index, array) => array.indexOf(c) == index).sort();
        // });

        //this.MapFunction();
        //this.FilterFunction();
        //this.ReduceFunction();
        //this.Combinalt();
    }

    getProducts(): Observable<Product[]> {
        return this.restDataSource.getProducts();
    }

    getProduct(id: number): Observable<Product> {
        return this.restDataSource.getProduct(id);
    }
   
    updateProduct(prod: Product): Observable<Product> {
        return this.restDataSource.updateProduct(prod);
    }

    saveProduct(prod: Product): Observable<Product> {
        return this.restDataSource.saveProduct(prod);
    }

    deleteProduct(productID: number): Observable<Product> {
       return this.restDataSource.deleteProduct(productID);
    }

    // getCategories(): string[] {
    //     return this.products.map(p => p.category).filter((cat, index, array) => array.indexOf(cat) == index).sort();
    // }

   private MapFunction() {

        //  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];

        // map with function
        // let egyAgrument = this.products.map(function(value) {return value.category});
        // console.log("egyAgrument: " + egyAgrument);

        // let kettoArgument = this.products.map(function(value, index) {
        //    return value.category + ", index: " + index;
        // });
        // console.log("kettoArgument : " + kettoArgument);


        // // map with arrow function LAMBDA
        
        // let egyAgrument_Arrow = this.products.map(p => {
        //     p.category
            
        // });

        //akár returnt is adhat vissza
        // return this.http.post<any>(this.baseURL + "login", {
        //     name: name, password: pw
        //     }).pipe(map(response => {
        //     this.auth_token = response.success ? response.token : null;
        //     return response.success;
        //     }));

        // console.log("egyAgrument_Arrow:" + egyAgrument_Arrow);

        // let kettoAgrument_Arrow = this.products.map((value, index) => {
        //     return "category:" + value.category + ", indexe: " + index;
        // });
        // console.log(kettoAgrument_Arrow);

        // az array arg maga az array amin meghijuk a map()-t
        // thisArgs maga a this azaz az objejktum, jelen esetben a ProductRepository objektum
        // let haromArgument_Arrow = this.products.map((value, index, array) => {
        //     console.log(index);
        //     array[index].category = "bende";
        //     console.log(array[index].category);
        // });
   }

//    private FilterFunction() {
//         // filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];

//         let egyArg = this.products.filter(function(prod) { return prod.category === "category 1" });
//         egyArg.forEach(p => console.log(p.id + " - " + p.category));
//         console.log("egyArg: " + egyArg.length);

//         // LAMBDA
//         let egyArgL = this.products.filter(p => p.category === "category 1");
//         egyArgL.forEach(p => console.log(p.id + " - " + p.category + " -- " + p.name));
//    }

//    private ReduceFunction() {
//     // reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

//        let összevontAr = this.products.reduce(function(accumulator, currentValue) {return accumulator + currentValue.price}, 0);    // 0 az InitialValue
//        console.log(összevontAr);

//        let osszevonArL = this.products.reduce((acc, curr) => {return acc + curr.price}, 5000);
//        console.log(osszevonArL);
//    }

//    private Combinalt() {
//         // a category 3 ok összevont ára
//         let osszPrice = this.products.filter(p => p.category === "category 3").map(p => p.price).reduce((acc, k) => {return acc + k}, 0);
//         console.log("osszPrice: " + osszPrice);
//    }

}
import {Component, Output, Input, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Product} from "../store/shared/Product";

@Component({
    selector: "inputoutput-form",
    templateUrl: "inputOutputForm.component.html"
})
export class InputOutputFormComponent implements OnChanges{

    newProduct: Product = {};
    selectedCategory: string;

    justdate: Date;
    myDateValue: Date;

    bsValue = new Date();
    bsRangeValue: Date[];
    maxDate = new Date();
    minDate = new Date();

    @Input()
    categories: string[];
    // egy új event tipust ozunk létre, amire majd a consumer componens figyelni fog
    // ez az event jön létre, ha új productot huzunk létre és átadásra kerül a product objektum
    @Output("newProductOutputEvent")
    newProductevent = new EventEmitter<Product>();

    @Input()
    receivedFromTable: Product;

    constructor() {
        this.myDateValue = new Date();

        // this.newProduct.category = this.categories[0]; ngOnInit be kellene rakni??
        this.newProduct.name = "initialized ";
        this.newProduct.category = "Kérem válasszon";

        this.minDate.setDate(this.minDate.getDate() - 1);
      this.maxDate.setDate(this.maxDate.getDate() + 7);
      this.bsRangeValue = [this.bsValue, this.maxDate];
    }

    // egy dolog, hogy az output propertit megkapta a perent a tabletol és aztán átadta a formnak, de aform nem értesül automatikusan ha az input prop updatelődött:
    // we must intercept input property changes
    ngOnChanges(changes: SimpleChanges) {
        for (const propName in changes) {
          const changedProp = changes[propName];

          if (propName == "receivedFromTable") {
            if (changedProp.currentValue !== undefined) {
                console.log("form comp detected changes on receivedFromTable @Input property and updating newProductevent property (for the template form model) with the received product");
                Object.assign(this.newProduct, changedProp.currentValue);
            }
          }
        }
    }

    clearForm(form: NgForm) {
        form.reset();
        this.newProduct.category = "Kérem válasszon";
    }

    simpleClicked() {
        if(confirm("Tényleg?")) { //egy window.confirm popupot nyit meg
            console.log("Tényleg");
        }
        else {
            open("");   //uj window broswer tab ablakot nyit meg
            console.log("nem Tényleg");
        }
    }

    submit(form: NgForm) {
        console.log("releaseDate..:" + this.newProduct.releaseDate);

        // b usiness rule: ha már van ilyen name akkor ne engedje felvenni, habnem  hibaüzenet a fenti coomon error mesage divben


        // validálás mezőnként



        this.newProductevent.emit(this.newProduct);
        form.reset();

    }
}
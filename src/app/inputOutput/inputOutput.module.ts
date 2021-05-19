import {NgModule} from "@angular/core";
import { InputOutputParentComponent } from "./inputOutputParent.component";
import { InputOutputFormComponent } from "./inputOutputForm.component";
import { InputOutputTableComponent } from "./inputOutputTable.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [SharedModule],
    declarations: [InputOutputParentComponent, InputOutputFormComponent, InputOutputTableComponent],
})
export class InputOutputModule {

}
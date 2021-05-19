import {NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { InputOutputFormComponent } from "./inputOutputForm.component";
import { InputOutputParentComponent } from "./inputOutputParent.component";
import { InputOutputTableComponent } from "./inputOutputTable.component";

const routes: Routes = [
    {path: "home", component: InputOutputParentComponent},
    {path: "form", component: InputOutputFormComponent},
    {path: "table", component: InputOutputTableComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class InputOutputRoutingModule {

}
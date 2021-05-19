import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const modulesToExport = [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, HttpClientModule];

@NgModule({
  imports: [...modulesToExport],
  exports: [...modulesToExport ]
})
export class SharedModule { }


// Shared module will be imported by many lazy loaded features and because of that it should NEVER implement any services
//  (providers: [ ]) and only contain declarables (components, directives and pipes) and modules (which only contain declarables).
import { BrowserModule } from '@angular/platform-browser';  // az egész appban csak 1 szer lehet deklarálni és azt legjobb itt
import { ErrorHandler, NgModule } from '@angular/core';
import {LOCALE_ID} from "@angular/core";
import localeFr from '@angular/common/locales/fr';
import localeHu from '@angular/common/locales/hu';
import { registerLocaleData } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// class
import {AppErrorHandler} from "../app/shared/AppErrorHandler";

// modules
import {AuthenticationModule} from "./authentication/authentication.module";
import { StoreModule} from "./store/store.module";
import {BookModule} from "../app/book/book.module";
import {InputOutputModule} from "../app/inputOutput/inputOutput.module";

// comps
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// routing modules
import {AppRoutingModule} from "./app-routing.module";

// services
import { StoreGuard } from "./authentication/store.guard";


registerLocaleData(localeFr, 'fr');
registerLocaleData(localeHu, 'hu');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, RouterModule, ReactiveFormsModule,
    AuthenticationModule, 
    AppRoutingModule, 
    StoreModule, BookModule, InputOutputModule
  ],
  providers: [StoreGuard, 
    {provide: LOCALE_ID, useValue: "hu_HU"},
    {provide: ErrorHandler, useClass: AppErrorHandler}  // custom error handling
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
 
 }
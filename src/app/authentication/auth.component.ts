 import { Component, Injectable } from "@angular/core";
 import { NgForm} from "@angular/forms";
 import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

 @Component({
     templateUrl: "auth.component.html"
 }) 
 export class AuthComponent {

    public username: string = "a";
    public password: string = "a";
    public errorMsg: string;
    public authenticated: boolean = false;

    constructor(private router: Router, private authService: AuthService) {}

    public authenticate(form: NgForm) {
        if (form.valid) {
            this.authService.authenticate(this.username, this.password).subscribe(response => {
                if(response) {
                    this.authenticated = response;                    
                    this.router.navigateByUrl("/home");
                } else {
                    this.errorMsg = "You are unathorized";
                    this.router.navigateByUrl("/auth");
                }
            });
        } else {
            this.errorMsg = "invalid form data";
        }
    }

 }
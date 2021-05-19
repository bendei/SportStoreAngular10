import {Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class StoreGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.authenticated) {
            this.router.navigateByUrl("auth");
            return false;
        }
        else {
            return true;
        }
    }

}
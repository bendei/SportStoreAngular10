import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { RestDataSource } from "../shared/rest.datasource";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(private restDs: RestDataSource) {}

    get authenticated(): boolean {
        return this.restDs.auth_token != null;
    }

    authenticate(user: string, pw: string): Observable<boolean> {
       return this.restDs.authenticate(user, pw);
    }

    clear() {
        this.restDs.auth_token = null;
    }

}
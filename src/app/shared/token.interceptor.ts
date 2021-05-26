import { Injectable } from '@angular/core';
import {  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import {RestDataSource} from "../shared/rest.datasource";


// https://stackoverflow.com/questions/61709816/problems-with-httpinterceptor-for-jwt-token-refreshing-in-angular-9
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private rs: RestDataSource) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addAuthenticationToken(request);
    return next.handle(request);
  }

  addAuthenticationToken(request: HttpRequest<any>) {
    const authToken = this.rs.auth_token;
    return request.clone({
      setHeaders: {
       'Authorization': `Bearer<${authToken}>` 
      }
    });
  }

}

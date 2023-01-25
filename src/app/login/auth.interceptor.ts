import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams, HttpHeaders
} from '@angular/common/http';
import {exhaustMap, Observable, take} from 'rxjs';
import {LoginService} from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService,) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //
  //   const token = this.loginService.getToken();
  //   const modifiedReq = request.clone({
  //     params: new HttpParams().set("Authorization", `Bearer ${token}`)
  //   });
  //   return next.handle(modifiedReq);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.loginService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set("Authorization", `Bearer ${user.token}`),
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
          .set("Authorization", `Bearer ${user.token}`)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}

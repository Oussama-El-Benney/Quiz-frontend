import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";
import {User} from './user.model';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // @ts-ignore
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  isLoginMode = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(username: string, password: string) {

    return this.http
      .post<any>(environment.backendHost + "/signup", {username, password}).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.username,
            resData.roles,
            resData.access_token,
            resData.refresh_token
          );
        })
      );
    //   const body = new HttpParams()
    //     .set('username', username)
    //     .set('password', password);
    //
    //   return this.http.post<any>(environment.backendHost + "/signup",
    //     body.toString(),
    //     {
    //       headers: new HttpHeaders()
    //         .set('Content-Type', 'application/x-www-form-urlencoded')
    //     }
    //   );
  }

  login(username: string, password: string) {
    // return this.http
    //   .post<any>(environment.backendHost + "/login", {username, password},this.options)

    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(environment.backendHost + "/login",
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData)
        this.handleAuthentication(
          resData.username,
          resData.roles,
          resData.access_token,
          resData.refresh_token
        );
      }))
  }

  private handleAuthentication(
    username: string,
    roles: string,
    accessToken: string,
    refreshToken: string,
  ) {
    const expiresIn = (JSON.parse(atob(accessToken.split('.')[1]))).exp;
    const expirationDate = new Date(expiresIn*1000);
    const user = new User(username, roles, accessToken, expirationDate, refreshToken);
    this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  public getUser(): string {
    return localStorage.getItem('userData')|| '{}';
  }
  public getToken(): string {
    return JSON.parse(window.localStorage.getItem('userData')|| '{}').accessToken;
    // @ts-ignore

  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  autoLogin() {
    const userData: {
      username: string,
      roles: string,
      accessToken: string,
      _tokenExpirationDate: string,
      refreshToken: string,
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.roles,
      userData.accessToken,
      new Date(userData._tokenExpirationDate),
      userData.refreshToken);

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    // @ts-ignore
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}



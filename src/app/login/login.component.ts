import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {LoginService} from "./login.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "./user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode=true;
  isLoading = false;
  error!: string;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
   this.loginService.isLoginMode.subscribe(value=>{
      this.isLoginMode=value;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // if (!form.valid) {
    //   return;
    // }
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
    let authObs: Observable<User>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.loginService.login(email, password);
    } else {
      authObs = this.loginService.signup(email, password);
    }
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/products/search'],{queryParams:{keyword:''}});
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }

}

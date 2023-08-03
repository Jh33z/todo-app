import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  displayError = false;
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    let authObs: Observable<AuthResponseData>;

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      this.isLoading = false;
    } else {
      authObs = this.authService.signup(email, password);
      this.isLoading = false;
    }

    authObs.subscribe(
      (res) => {
        this.isLoading = false;
        console.log('hello there', res);
        // this.authService.user.next({});
        this.router.navigate(['/add']);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.displayError = true;
        this.error = errorMessage;
        setTimeout(() => {
          this.displayError = false;
          this.error = '';
        }, 3000);
      }
    );
    form.reset();
  }
}

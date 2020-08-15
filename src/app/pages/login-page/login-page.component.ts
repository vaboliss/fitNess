import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import {RouterLink } from '@angular/router';

@Component({
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  logInForm;
  hide = true;
  message = "";

  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthService) {
    this.logInForm = this.formBuilder.group({
      email: "",
      password: "",
    });
  }

  ngOnInit() {
    this.hide = false;
    this.message = "";
  }

  async logIn(userData) {
    if (userData.email === "" || userData.password === "") {
      return;
    }
    const observe = this.auth
      .login({ email: userData.email, password: userData.password })
      .subscribe(
        (data: boolean) => {
          console.log(data);
          if(data){
            this.router.navigateByUrl('/home');
            return;
          }
        },
        (err) => {
            this.hide = false;
            this.message = err.error.message;
            return;
        
        }
      );
  }
}

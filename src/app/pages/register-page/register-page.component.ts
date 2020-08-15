import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../../components/register-dialog.component';

@Component({ 
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.css"],
})
export class RegisterPageComponent implements OnInit {
  registrationForm;
  hide = true;
  message = "";
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {
    this.registrationForm = this.formBuilder.group({
      name: "",
      email: "",
      password: "",
    });
  }
  register(userData) {
    if (userData.name === "") {
      this.hide = false;
      this.message = "Name field is empty";
      return;
    }
    if (userData.email === "") {
      this.hide = false;
      this.message = "Email field is empty";
      return;
    }
    if (userData.password === "") {
      this.hide = false;
      this.message = "Password field is empty";
      return;
    }

    this.registerService.register({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }).subscribe(
      (data: any) => {
        this.registrationForm.reset();
        this.dialog.open(RegisterDialogComponent);
        return;
      },
      (err) => {
          this.hide = false;
          this.message = err.error.message;
          return;
      }
    );
  }
  ngOnInit() {
    this.hide = true;
    this.message = "";
  }
}

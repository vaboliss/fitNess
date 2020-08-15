import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'dialog-element',
  template: 
  `
    <h1 mat-dialog-title>Success</h1>
    <div mat-dialog-content>You can now sign in and track your achievements</div>
    <div mat-dialog-actions>
    <button mat-raised-button mat-dialog-close [routerLink]="['/login']">
        Sign In
    </button>
    <button mat-button mat-dialog-close>
        Close
    </button>
    </div>
  `,
  styleUrls:['./register-dialog.component.css']
})
export class RegisterDialogComponent {}
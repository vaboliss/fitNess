import { Component } from "@angular/core";
@Component({
  selector: "delete-dialog-element",
  template: `
    <h1 mat-dialog-title>Confirmation</h1>
    <div mat-dialog-content>Are you sure you want to delete this ?</div>
    <div mat-dialog-actions>
      <button [mat-dialog-close]="true" mat-raised-button mat-dialog-close>
        Yes
      </button>
      <button [mat-dialog-close]="false" mat-button mat-dialog-close>
        No
      </button>
    </div>
  `,
  styleUrls: ["./register-dialog.component.css"],
})
export class DeleteDialogComponent {}

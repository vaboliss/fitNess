import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(user: { name: string; email: string; password: string }) {
    return this.http
      .post<any>(`http://localhost:3000/api/user/register`, user)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}

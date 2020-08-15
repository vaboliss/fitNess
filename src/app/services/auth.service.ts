import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, mapTo, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loggedUser: string;

  Url = "http://localhost:3000";

  login(user: { email: string; password: string }) {
    return this.http.post<any>(`http://localhost:3000/api/user/login`, user).pipe(
      tap((token) => {
        this.doLoginUser(token.name, token);
      }),
      mapTo(true),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  storeTokensJwtToken(jwt: any) {
    localStorage.setItem("jwt", jwt.token);
  }
  getJwtToken() : string {
    return localStorage.getItem("jwt");
  }
  doLoginUser(name: string, tokens: any) {  
    this.loggedUser = name;
    this.storeTokensJwtToken(tokens);
  }
  isLoggedIn() {
    const jwt = this.getJwtToken();
    return this.http.get<any>(`http://localhost:3000/api/user/IsValidToken`,{ headers: { "auth-token": jwt } }).pipe(
      tap(() => {}),
      mapTo(true),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}

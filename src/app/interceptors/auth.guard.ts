import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, throwError, of } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { tap, mapTo, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
  
      const jwt = this.authService.getJwtToken();
       return this.http.get<any>(`http://localhost:3000/api/user/IsValidToken`,{ headers: { "auth-token": jwt } }).pipe(
        tap((status) => {
        }),mapTo(true),
        catchError((error) => {
          this.router.navigate(['/login']);
          return throwError(error);
        })
      );
  }
}

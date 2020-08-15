import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class WorkoutService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  getWorkouts() {
    return this.http
      .get<any>("http://localhost:3000/api/workouts", {
        headers: { "auth-token": this.auth.getJwtToken() },
      })
      .pipe(
        tap(),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  getWorkout(id: string) {
    return this.http
      .get<any>("http://localhost:3000/api/workouts/" + id, {
        headers: { "auth-token": this.auth.getJwtToken() },
      })
      .pipe(
        tap(),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  update(
    id: string,
    workout: { workoutName: any; exercises: { exerciseName: string }[] }
  ) {
    return this.http
      .patch<any>(`http://localhost:3000/api/workouts/` + id, workout, {
        headers: { "auth-token": this.auth.getJwtToken() },
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  editWorkout() {}

  deleteWorkout(id: string) {
    return this.http
      .delete<any>("http://localhost:3000/api/workouts/" + id, {
        headers: { "auth-token": this.auth.getJwtToken() },
      })
      .pipe(
        tap(),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  createWorkouts(workout) {
    return this.http
      .post<any>(`http://localhost:3000/api/workouts`, workout, {
        headers: { "auth-token": this.auth.getJwtToken() },
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { WorkoutService } from "src/app/services/workout.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-workout-details",
  templateUrl: "./workout-details.component.html",
  styleUrls: ["./workout-details.component.css"],
})
export class WorkoutDetailsComponent implements OnInit {
  Workout;
  workoutUpdateForm: FormGroup;
  exercises = new Array<{ exerciseName: string }>();
  hide = true;
  message = "";
  id;
  Shide = true;
  Successmessage = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.workoutUpdateForm = this.formBuilder.group({
      workoutName: "",
      exercise: "",
    });
    const param = this.route.snapshot.paramMap.get("id");
    if (param) {
      this.id = param;
      this.getWorkout(this.id);
    }
  }
  delete(data) {
    this.exercises = this.exercises.filter(
      (item) => item.exerciseName !== data
    );
  }
  create(data) {
    this.hide = true;
    this.message = "";
    this.Shide = true;
    this.Successmessage = "";

    if (data.exercise === "" || data.exercise === null) {
      this.hide = false;
      this.message = "Exercise Name should not be empty";
      return;
    }
    const ex = { exerciseName: data.exercise };
    if (this.exercises.length !== 0) {
      var index = this.exercises.findIndex(
        (item) => item.exerciseName === data.exercise
      );
    }

    if (index >= 0) {
      this.hide = false;
      this.message = "Exercise is already in the list";
      return;
    }
    this.exercises.push(ex);
    this.workoutUpdateForm.controls["exercise"].reset();
  }

  UpdateWorkout(data) {
    this.hide = true;
    this.message = "";
    this.Shide = true;
    this.Successmessage = "";

    if (data.workoutName === "") {
      this.hide = false;
      this.message = "Workout has to have name";
      return;
    }

    const workout = {
      workoutName: data.workoutName,
      exercises: this.exercises,
    };

    this.workoutService.update(this.id, workout).subscribe(
      (data) => {
        this.Shide = false;
        this.Successmessage = "Workout has been updated";
      },
      (err) => {
        this.hide = false;
        this.message = err.error.message;
        console.log(err);
        return;
      }
    );
  }

  getWorkout(id: string) {
    this.workoutService.getWorkout(id).subscribe({
      next: (data) => {
        this.Workout = {
          workoutName: data.workoutName,
          exercises: data.exercises,
        };
        this.workoutUpdateForm = this.formBuilder.group({
          workoutName: this.Workout.workoutName,
          exercise: "",
        });
        this.exercises = this.Workout.exercises;
      },
      error: (err) => {
        this.hide = false;
        this.message = err;
      },
    });
  }
}

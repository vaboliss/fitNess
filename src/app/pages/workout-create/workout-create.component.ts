import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";
import { empty } from "rxjs";
import { WorkoutService } from "src/app/services/workout.service";

@Component({
  selector: "app-workout-create",
  templateUrl: "./workout-create.component.html",
  styleUrls: ["./workout-create.component.css"],
})
export class WorkoutCreateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService
  ) {}

  exercises = new Array<{ exerciseName: string }>();
  hide = true;
  message = "";
  public workoutCreationForm: FormGroup;
  create(data) {
    this.hide = true;
    this.message = "";

    if (data.exercise === "" || data.exercise === null) {
      this.hide = false;
      this.message = "Exercise Name should not be empty";
      return;
    }
    const ex = { exerciseName: data.exercise };
    var index = this.exercises.findIndex(
      (item) => item.exerciseName === data.exercise
    );
    if (index >= 0) {
      this.hide = false;
      this.message = "Exercise is already in the list";
      return;
    }
    this.exercises.push(ex);
    this.workoutCreationForm.controls["exercise"].reset();
  }
  delete(data) {
    this.exercises = this.exercises.filter(
      (item) => item.exerciseName !== data
    );
  }
  createWorkout(data) {
    this.hide = true;
    this.message = "";

    if (data.workoutName === "") {
      this.hide = false;
      this.message = "Workout has to have name";
      return;
    }

    const workout = {
      workoutName: data.workoutName,
      exercises: this.exercises,
    };

    this.workoutService.createWorkouts(workout).subscribe(
      (data) => {
        this.workoutCreationForm.reset();
        this.exercises = []
      },
      (err) => {
        this.hide = false;
        this.message = err.error.message;
        return;
      }
    );
  }
  ngOnInit() {
    this.workoutCreationForm = this.formBuilder.group({
      workoutName: "",
      exercise: "",
    });
  }
}

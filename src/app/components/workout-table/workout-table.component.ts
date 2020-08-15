import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { WorkoutService } from "src/app/services/workout.service";
import { DeleteDialogComponent } from '../delete-dialog.component';

@Component({
  selector: "app-workout-table",
  templateUrl: "./workout-table.component.html",
  styleUrls: ["./workout-table.component.css"],
})
export class WorkoutTableComponent implements OnInit {
  displayedColumns: string[] = ["name", "actionsColumn"];
  data: Workout[] = [];
  dataSource = new MatTableDataSource<Workout>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private workoutService: WorkoutService
  ) {}
  delete(data) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return;
      }
      console.log(data);
      this.workoutService.deleteWorkout(data).subscribe();
      this.getAllWorkouts();
    });
  }
  ngOnInit() {
    this.getAllWorkouts();
    this.dataSource.paginator = this.paginator;
  }
  getAllWorkouts(){
    this.workoutService.getWorkouts().subscribe({
      next: (workouts) => {
        this.data = workouts;
        this.dataSource = new MatTableDataSource<Workout>(this.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
export interface Workout {
  _id: string;
  workoutName: string;
}

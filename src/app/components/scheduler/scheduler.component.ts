import { Component, OnInit } from "@angular/core";
import { WorkoutDaysService } from 'src/app/services/workout-days.service';

@Component({
  selector: "app-scheduler",
  templateUrl: "./scheduler.component.html",
  styleUrls: ["./scheduler.component.css"],
})
export class SchedulerComponent implements OnInit {

  workoutDays;

  constructor(private workoutDaysService: WorkoutDaysService ){

  }


  ngOnInit(): void {
    this.workoutDaysService.getWorkoutDays().subscribe({
      next: (data) => console.log(data)
    });
    
  }

}

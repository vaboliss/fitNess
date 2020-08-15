import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {MaterialModule} from './app-material-import';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register.service';
import { RegisterDialogComponent } from './components/register-dialog.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { WorkoutService } from './services/workout.service';
import { WorkoutTableComponent } from './components/workout-table/workout-table.component';
import { DeleteDialogComponent } from './components/delete-dialog.component';
import { WorkoutDetailsComponent } from './pages/workout-details/workout-details.component';
import { WorkoutCreateComponent } from './pages/workout-create/workout-create.component';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { WorkoutDaysService } from './services/workout-days.service';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PageNotFoundComponent,
    RegisterDialogComponent,
    NavBarComponent,
    WorkoutTableComponent,
    DeleteDialogComponent,
    WorkoutDetailsComponent,
    WorkoutCreateComponent,
    SchedulerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    SchedulerModule,
    DateInputsModule,
    DropDownsModule,
    FormsModule

  ],
  entryComponents: [RegisterDialogComponent,DeleteDialogComponent],
  providers: [AuthService , RegisterService, WorkoutService, WorkoutDaysService],
  bootstrap: [AppComponent]
})
export class AppModule { }

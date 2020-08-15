import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WorkoutsPageComponent } from './pages/workouts-page/workouts-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './interceptors/auth.guard';
import { WorkoutDetailsComponent } from './pages/workout-details/workout-details.component';
import { WorkoutCreateComponent } from './pages/workout-create/workout-create.component';


const routes: Routes = [
      {path: 'register', component: RegisterPageComponent},
      {path: 'welcome', component: WelcomePageComponent},
      {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
      {path: 'workouts', component: WorkoutsPageComponent, canActivate: [AuthGuard]},
      {path: 'workouts/create', component: WorkoutCreateComponent, canActivate: [AuthGuard]},
      {path: 'workouts/:id', component: WorkoutDetailsComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginPageComponent},
      {path: '', redirectTo:'welcome', pathMatch: 'full'},
      { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginPageComponent,RegisterPageComponent,WelcomePageComponent,HomePageComponent,WorkoutsPageComponent];

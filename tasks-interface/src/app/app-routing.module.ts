import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardComponent} from "./auth-guard/auth-guard.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TaskFormComponent} from "./task-form/task-form.component";
import {TaskListComponent} from "./task-list/task-list.component";
import {PopUpTaskComponent} from "./pop-up-task/pop-up-task.component";


const routes: Routes = [
  {path: "home", component: AppComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "task" , component: TaskFormComponent},
  {path: "task/:id" , component: TaskFormComponent},
  {path: "pop/:id" , component: PopUpTaskComponent},
  {path: "task-list", component: TaskListComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardComponent]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

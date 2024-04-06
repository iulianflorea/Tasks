import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RegisterComponent} from "./register/register.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './header/header.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthInterceptor} from "./header/auth-interceptor";
import { TaskFormComponent } from './task-form/task-form.component';
import {MatSelectModule} from "@angular/material/select";
import { TaskListComponent } from './task-list/task-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AuthGuardComponent,
    DashboardComponent,
    TaskFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    RegisterComponent,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

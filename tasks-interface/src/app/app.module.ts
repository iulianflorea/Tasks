import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RegisterComponent} from "./register/register.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from "@angular/material/button";





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

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


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

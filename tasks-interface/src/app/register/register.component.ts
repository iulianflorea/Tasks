import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,FormsModule
  ]
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl,
    lastname: new FormControl,
    email: new FormControl,
    password: new FormControl
  })

  register() {

  }
}

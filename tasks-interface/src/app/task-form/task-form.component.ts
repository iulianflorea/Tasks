import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {UserDto} from "../dtos/userDto";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  id: any;
  toDo: any;
  status: any;
  userId: any;
  username: any;
  beginDate: any;
  completedDate: any;
  userList: UserDto[] = [];

  constructor(private httpClient:HttpClient, private router: Router) {
  }

  taskForm: FormGroup = new FormGroup({
    toDo: new FormControl,
    status: new FormControl,
    username: new FormControl,
    beginDate: new FormControl,
    completedDate: new FormControl
  })

  ngOnInit() {
    this.getUser();


  }

  create() {

  }

  getUser() {
    this.httpClient.get("/api/api/v1/user/findAll").subscribe((response) =>{
      console.log(response);
      this.userList = response as UserDto[];

    })
  }

}

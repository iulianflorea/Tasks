import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {UserDto} from "../dtos/userDto";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit{

  id: any;
  toDo: any;
  status: any;
  userId: any;
  beginDate: any;
  completedDate: any;
  userList: UserDto[] = [];

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  taskForm: FormGroup = new FormGroup({
    toDo: new FormControl(),
    status: new FormControl(),
    userId: new FormControl(),
    beginDate: new FormControl(),
    completedDate: new FormControl()
  })

  ngOnInit() {
    this.getUser();

  }

  create() {
    var task = {
      id: this.id,
      toDo: this.toDo,
      status: this.status,
      userId: this.userId,
      beginDate: this.beginDate,
      completedDate: this.completedDate
    }
    this.httpClient.post("/api/task/create" , task).subscribe((response) => {
      console.log(response);
      alert("Task was created");
      this.router.navigate(["/task-list"]);
    })
  }

  getUser() {
    this.httpClient.get("/api/user/findAll").subscribe((response) => {
      console.log(response);
      this.userList = response as UserDto[];

    })
  }

}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserDto} from "../dtos/userDto";
import {TaskDto} from "../dtos/TaskDto";
import {MatNativeDateModule, MatOptionModule, NativeDateAdapter} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  standalone: true,
  providers: [MatNativeDateModule, NativeDateAdapter],

  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule, MatIconModule, MatButtonModule, RouterLink, NgForOf, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, NgIf],
})
export class TaskFormComponent implements OnInit {

  id: any;
  toDo: any;
  status: any;
  userId: any;
  beginDate?: any;
  completedDate?: any;
  userList: UserDto[] = [];

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {
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
    console.log("id", this.route.snapshot.params['id'])
    if (this.route.snapshot.params['id'] !== undefined) {
      this.httpClient.get("/api/task/findById/" + this.route.snapshot.params['id']).subscribe((response: TaskDto) => {
        console.log(response);
        // @ts-ignore
        this.id = response.id;
        this.toDo = response.toDo;
        this.status = response.status;
        this.userId = response.userId;
        this.beginDate = response.beginDate;
        this.completedDate = response.completedDate;
      })
    }
  }



  selectedDate: Date = this.beginDate;
  selectedDate2: Date = this.completedDate;

  saveDate() {
    this.selectedDate.setMinutes(this.selectedDate.getMinutes() - this.selectedDate.getTimezoneOffset());
    const savedDate = this.selectedDate.toISOString().substring(0, 10) // Formatare ca string YYYY-MM-DD
    this.beginDate = savedDate;
    console.log('Data salvată:', savedDate);

  }

  saveDate2() {
    this.selectedDate2.setMinutes(this.selectedDate2.getMinutes() - this.selectedDate2.getTimezoneOffset());
    const savedDate = this.selectedDate2.toISOString().substring(0, 10) // Formatare ca string YYYY-MM-DD
    this.completedDate = savedDate;
    console.log('Data salvată:', savedDate);

  }

  saveDate12() {
    this.saveDate();
    this.saveDate2();
  }

  create() {
    var task = {
      id: this.id,
      toDo: this.toDo,
      status: this.status.toUpperCase(),
      userId: this.userId,
      beginDate: this.selectedDate,
      completedDate: this.selectedDate2
    }
    this.httpClient.post("/api/task/create", task).subscribe((response) => {
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

  protected readonly localStorage = localStorage;
}

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {TaskDto} from "../dtos/TaskDto";
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {Observable} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule, MatIconModule, MatButtonModule, RouterLink, NgForOf],
})
export class TaskListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'toDo', 'status', 'user', 'beginDate', 'completedDate', 'update', 'delete'];
  dataSource: TaskDto[] = [];
  dataSource2 = new MatTableDataSource<TaskDto>(this.dataSource);
  keyword: string = '';
  searchResult: TaskDto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }

  ngOnInit() {
    this.httpClient.get("/api/task/findAll").subscribe((response) => {
      console.log(response);
      this.dataSource = response as TaskDto[];
      this.dataSource2.data = this.dataSource;
    })
  }

  searchTask(keyword:string): Observable<TaskDto[]> {
    return this.httpClient.get<TaskDto[]>(`/api/task/search?keyword=${keyword}`);
  }

  search() {
    this.searchResult = [];
    if(this.keyword) {
      this.httpClient.get(`/api/task/search?keyword=${this.keyword}`).subscribe((data: any) => {
        console.log(data);
        this.dataSource2 = data;
      })
    }
    this.searchTask(this.keyword).subscribe(data =>this.searchResult = data);
  }

  delete(taskDto: TaskDto) {
    const id = taskDto.id;
    if (confirm("Sure you want to delete it?")) {
      this.httpClient.delete("/api/task/delete/" + id).subscribe((response) => {
        console.log(response);
        alert(" The intervention was deleted");
        this.ngOnInit();
      })
    }
  }

  update(taskDto: TaskDto) {

    this.httpClient.put("/api/task/update", taskDto).subscribe((response) =>{
      console.log(response);
    })
  }


}

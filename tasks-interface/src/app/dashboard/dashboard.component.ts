import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TaskDto} from "../dtos/TaskDto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit{

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
    this.httpClient.get("/api/task/userTasks/" + localStorage.getItem("token") ).subscribe((response) => {
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

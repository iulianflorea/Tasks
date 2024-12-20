import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {TaskDto} from "../dtos/TaskDto";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, NativeDateAdapter} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDialog} from "@angular/material/dialog";
import {PopUpTaskComponent} from "../pop-up-task/pop-up-task.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MatNativeDateModule, NativeDateAdapter],
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule, MatIconModule, MatButtonModule, RouterLink, NgForOf, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule, NgIf, PopUpTaskComponent],
  standalone: true
})
export class DashboardComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'toDo', 'status', 'user', 'beginDate', 'completedDate', 'view'];
  dataSource: TaskDto[] = [];
  dataSource2 = new MatTableDataSource<TaskDto>(this.dataSource);
  keyword: string = '';
  searchResult: TaskDto[] = [];
  @Input() item: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private httpClient: HttpClient, private router: Router, private dialogRef: MatDialog) {

  }

  selectedItem: any = null;
  isModalOpen = false;

  openModal(item: any) {
    this.selectedItem = item;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  selectedDate: Date = new Date();
  saveDate() {
    this.selectedDate.setMinutes(this.selectedDate.getMinutes() - this.selectedDate.getTimezoneOffset());
    const savedDate = this.selectedDate.toISOString().substring(0, 10) // Formatare ca string YYYY-MM-DD
    console.log('Data salvată:', savedDate);

    // this.keyword = this.selectedDate.toISOString().slice(0, 10);

    if(this.keyword === "") {
      this.keyword = this.selectedDate.toISOString().slice(0, 10);
    }

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

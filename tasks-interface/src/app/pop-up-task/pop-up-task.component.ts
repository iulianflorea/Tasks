import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../dtos/userDto";
import {TaskDto} from "../dtos/TaskDto";
import {TaskFormComponent} from "../task-form/task-form.component";
import {TaskListComponent} from "../task-list/task-list.component";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-pop-up-task',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './pop-up-task.component.html',
  styleUrl: './pop-up-task.component.css'
})
export class PopUpTaskComponent {
  id: any;
  toDo: any;
  status: any;
  userId: any;
  beginDate: any;
  completedDate: any;
  userList: UserDto[] = [];

  @Input() item: any;
  @Output() close = new EventEmitter<void>(); // Evenimentul de închidere
  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {

  }


  closeModal() {
    this.close.emit(); // Emite evenimentul când modalul trebuie închis
  }

  selectedItem: any = null;
  isModalOpen = false;

  openModal(item: any) {
    this.selectedItem = item;
    this.isModalOpen = true;
  }

  protected readonly TaskDto = TaskDto;
  protected readonly TaskListComponent = TaskListComponent;

  delete(taskDto: TaskDto) {
    const id = taskDto.id;
    if (confirm("Sure you want to delete it?")) {
      this.httpClient.delete("/api/task/delete/" + id).subscribe((response) => {
        console.log(response);
        alert(" The intervention was deleted");
        this.closeModal();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/task-list']); // Navighează din nou la aceeași adresă
        });
      })
    }
  }
}

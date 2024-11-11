import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopUpTaskComponent} from "./pop-up-task/pop-up-task.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tasks-interface';

  constructor(private dialogRef: MatDialog) {}


}

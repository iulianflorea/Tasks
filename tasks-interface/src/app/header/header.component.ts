import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private httpClient: HttpClient) {
  }
  responseSaved: Object = "";

  demo() {

    this.httpClient.get("/api/api/v1/demo-controller").subscribe((response) =>{
      console.log(response);
      this.responseSaved = response;

    })
}

}


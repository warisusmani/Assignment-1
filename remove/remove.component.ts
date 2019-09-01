import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient,  HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  constructor(private router: Router, private httpService: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  group;
  groups;
  ngOnInit() {
    this.httpService.get<any>(this.apiURL + 'createchannel').subscribe(
      data => {
        if(data['success'] == true) {
          this.group = data.group;
          console.log(this.group);
        }
        else {
          console.log("No groups found");
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
  RemoveGroup() {
    this.httpService.post<any>(this.apiURL + 'deletegroup',{group:this.groups}).subscribe(
      data => {
        if(data['success'] == true) {
          alert(data.group + " is removed");
        }
        else {
          alert("No groups found");
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}

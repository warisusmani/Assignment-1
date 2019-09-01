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
  channel;
  channels = [];
  user;
  users = [];
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

    this.httpService.get<any>(this.apiURL + 'getchannels').subscribe(
      data => {
        if(data.success == true) {
          this.channels = data.channels;
          
        }
        else {
          console.log("No groups found");
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  
    this.httpService.get<any>(this.apiURL + 'user').subscribe(
      data => {
        if(data.success == true) {
          this.users = data.users;
          
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
        if(data.success === true) {
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

  RemoveChannel() {
    this.httpService.post<any>(this.apiURL + 'deletechannel',{channel:this.channel}).subscribe(
      data => {
        if(data.success === true) {
          alert(data.channel + " is removed");
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
  
  RemoveUser() {
    this.httpService.post<any>(this.apiURL + 'deleteuser',{user:this.user}).subscribe(
      data => {
        if(data.success === true) {
          alert(data.user + " is removed");
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

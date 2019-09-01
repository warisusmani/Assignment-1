import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient,  HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router, private httpService: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  username: string;
  group: string;
  channels = [];
  channel: string; //value of selected channel
  role: string;
  groupadmin:boolean=false;
  superadmin:boolean=false;
  ngOnInit() {
  this.username = localStorage.getItem("username");
  // this.httpService.get<any>(this.apiURL + 'channels', {params: {username: this.username}}).subscribe(
  //   data => {
  //     if(data['success'] == true) {
  //       this.channels = data.channels;
  //      console.log(this.channels);
  //     }
  //     else {
  //       console.log("No channels found");
  //     }
  //   },
  //   (err: HttpErrorResponse) => {
  //     console.log (err.message);
  //   }
  // );
  this.httpService.post<any>(this.apiURL + 'userchannels', {user: this.username}).subscribe(
    data => {
      if(data.success === true) {
        this.channels = data.channels;
      }
      else {
        this.channels = null;
        console.log("No channels found");
      }
    },
    (err: HttpErrorResponse) => {
      console.log (err.message);
    }
  );




  this.httpService.post<any>(this.apiURL + 'groups',{username: this.username}).subscribe(
    data => {
      if(data['success'] == true) {
        this.group = data.group;
      }
      else {
        console.log("No group found");
      }
    },
    (err: HttpErrorResponse) => {
      console.log (err.message);
    }
  );

  this.httpService.get<any>(this.apiURL + 'roles', {params: {username: this.username}}).subscribe(
    data => {
      if(data['success'] == true) {
        this.role = data.role;
        for(let i=0;i<this.role.length;i++) {
        if (this.role[i] == "Group Admin") {
          this.groupadmin = true;
        }
        else if(this.role[i] == "Super Admin") {
          this.superadmin = true;
        }
      }
       
      }
      else {
        console.log("No role found");
      }
    },
    (err: HttpErrorResponse) => {
      console.log (err.message);
    }
  );



  }

 
    
  
  onEditClick(channel: any) {
    localStorage.setItem("channel",channel);
}
  OnLogOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  
  }
  OnChat() {
    this.router.navigateByUrl('/chat');
  }
  OnHistory() {
    this.router.navigateByUrl('/history');
  }
  OnCreateGroup() {
    this.router.navigateByUrl('/group');
  }
  OnCreateUser() {
    this.router.navigateByUrl('/user');
  }
  OnCreateChannel() {
    this.router.navigateByUrl('/channel');
  }
  OnRemove() {
    this.router.navigateByUrl('/remove');
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private httpService: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  username:string;
  users;
  users2;
  chosenuser;
  chosenuser2;
  chosenchannel;
  channel;
  chosenrole;
  role;
  isadmin = false;
  issuper = false;
  user;
  ngOnInit() {
    this.user = localStorage.getItem("username");
    this.httpService.get<any>(this.apiURL + 'user').subscribe(
      data => {
        if(data['success'] == true) {
          this.users = data.users;
          this.users2=data.users;
          console.log(this.users);  
        }
        else {
          console.log("No users found");
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
     
    );
    this.httpService.get<any>(this.apiURL + 'roles', {params: {username: this.user}}).subscribe(
      data => {
        if(data['success'] == true) {
          this.role = data.role;
          for(let i=0;i<this.role.length;i++) {
            console.log(this.role[i]);
          if (this.role[i] == "Group Admin") {
            this.isadmin = true;
          }
          else if(this.role[i] == "Super Admin") {
            this.issuper = true;
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
  
  userSelected(user: any) {
    this.httpService.post<any>(this.apiURL + 'groupchannels',{user:user}).subscribe(
      data => {
        if(data.success === true) {
          this.channel = data.channels;
            
        }
        else {
          console.log("No channels found");
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    }
  OnUser() {
    this.httpService.get<any>(this.apiURL + 'register', {params: {username: this.username}}).subscribe(
      data => {
        if(data['success'] == true) {
          alert("User " + data.username + " created successfully");
        }
        else {
          console.log("User exists or user could not be created");
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
   }
  
  OnChannel(){
    this.httpService.post<any>(this.apiURL + 'listchannels', {user: this.chosenuser,channel:this.chosenchannel}).subscribe(
      data => {
        if(data['success'] == true) {
          alert("User " + data.username + " has been added to channel " + data.channels + " successfully");
        }
        else {
         alert("User exists in the channel or could not be added to the channel");
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
   }
  OnRole() {
    this.httpService.post<any>(this.apiURL + 'roles', {user: this.chosenuser2,role:this.chosenrole}).subscribe(
      data => {
        if(data['success'] == true) {
          alert("User " + data.username + " has been assigned the role of " + data.roles + " successfully");
        }
        else {
         alert("User already has this role or could not be assigned this role");
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    

  }
  
 
}

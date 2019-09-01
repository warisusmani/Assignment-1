import { Component, OnInit } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private httpService: HttpClient, private router:Router) { }
  private apiURL = 'http://localhost:3000/api/';
  group: string;
  ngOnInit() {
  }
  CreateGroup(event){
    event.preventDefault();
    this.httpService.post<any>(this.apiURL + 'creategroup',{group: this.group}).subscribe(
      data => {
        if(data['success'] == true) {
          alert("Created group: " + data.newgroup + " Successfully");
          this.router.navigateByUrl("/account");
        }
        else {
          alert("Duplicate Group or Could not create group");
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  
  
  
  
  }
}

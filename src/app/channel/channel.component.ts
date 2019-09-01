import { Component, OnInit } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor(private router: Router, private httpService: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  group;
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
  onEditClick(group: any) {
    console.log('group name', group)
}
}

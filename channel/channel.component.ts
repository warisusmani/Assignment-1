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
  channelname:string;
  ss;
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
  onEditClick(ss: any) {
    this.ss =  ss;
    
  }
  OnChannel() {
    this.httpService.post<any>(this.apiURL + 'createchannel',{chosengroup:this.ss,channelname:this.channelname}).subscribe(
      data => {
        if(data['success'] == true) {
          alert("Channel " + data.newchannel + " created successfully");
        }
        else {
          alert("Channel exists or could not be created");
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
}
}

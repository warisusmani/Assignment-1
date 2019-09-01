import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private router:Router) { }

  channel;
  username;

  ngOnInit() {
    if (!localStorage.getItem('username')) {
      //No valid session is available
     console.log('Not validated');
     localStorage.clear();
     alert("Not a valid user");
     this.router.navigateByUrl('login');

  }else {
   //We have a valid username. Subscribe to chat service and add chat message
  //to the message array each time you are pushed a message from the server.
  this.channel = localStorage.getItem("channel");
  this.username = localStorage.getItem("username");
  }
  }
  logout() {
    this.router.navigateByUrl('/account');
  }

}

import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket/socket.service';
import {Router} from "@angular/router";
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string
  messages:Array<{user:String,message:String}> = [];
  message;
  connection;
  channel;
  constructor(private sockServ: SocketService, private router: Router) { }

  ngOnInit() {

    //Check for valid user and subscribe to service (chat messages)
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
    this.sockServ.joinRoom({user:this.username, channel:this.channel});
   
    console.log("Session started for: " + this.username);
    this.sockServ.newUserJoined() //constructor has suscribed to this event and when event is received push it on to the messageArray
    .subscribe(data=> this.messages.push(data));

    this.sockServ.userLeftRoom()
    .subscribe(data=>this.messages.push(data));
    // this.connection = this.sockServ.getMessages().subscribe(message=>{
    // //"message" is value of input field.
    // this.messages.push(message);
    // this.message = '';
    // });
    this.sockServ.newMessageReceived()
        .subscribe(data=>this.messages.push(data));
    }
  }
  sendMessage() {
    //Send a chat message back to the server
    // this.sockServ.sendMessage(this.message + '('+this.username+')');
    this.sockServ.sendMessage({user:this.username, channel:this.channel, message:this.message});
  }
  ngOnDestroy() {
    //When leaving this component close down the subscription
    if(this.connection) {
      this.connection.unsubscribe();
    }
  }
  logout(){
    this.sockServ.leaveRoom({user:this.username, channel:this.channel});
    console.log('Leaving the chat channel');
    this.router.navigateByUrl('account');
  }

}

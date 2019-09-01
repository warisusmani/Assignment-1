import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient,  HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { PARAMETERS } from '@angular/core/src/util/decorators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  //password:string = '';
  
  constructor(private router:Router, private form:FormsModule, private httpService: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  ngOnInit() {
    console.log("testing if dom is ready");
    
   
  }
  loginUser(event){
    event.preventDefault();
  
//    if (this.username == "Saad" && this.password == "123"){
      if (typeof(Storage) != "undefined") {
        console.log('storage ready');
        
        this.httpService.get<any>(this.apiURL + 'auth', {params: {username: this.username}}).subscribe(
          data => {
            if(data['success'] == true) {
              localStorage.setItem('username',this.username);
              this.router.navigateByUrl('/account');
            }
            else {
              alert("Username or Password is Wrong");
            }
          },
          (err: HttpErrorResponse) => {
            console.log (err.message);
          }
        );
      }
     // }
   
     
    //}
    
    // else {
    //   alert('Username or password is incorrect. :)');
    // }
  
}
    
  }


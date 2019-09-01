import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '../../node_modules/@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { HttpModule } from '@angular/http'
import { NotfoundComponent } from './notfound/notfound.component';
import { SocketService } from './services/socket/socket.service';
import { HttpClientModule } from '@angular/common/http';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { UserComponent } from './user/user.component';
import { RemoveComponent } from './remove/remove.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    ChatComponent,
    NotfoundComponent,
    GroupComponent,
    ChannelComponent,
    UserComponent,
    RemoveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule

  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

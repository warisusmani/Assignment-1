import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
import {RemoveComponent} from './remove/remove.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HistoryComponent } from './history/history.component';
const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'account', component:AccountComponent},
  {path:'group',component:GroupComponent},
  {path: 'channel', component:ChannelComponent},
  {path:'chat', component:ChatComponent},
  {path: 'user', component:UserComponent},
  {path:'remove', component:RemoveComponent},
  {path:'404', component:NotfoundComponent},
  {path: 'history', component: HistoryComponent},
  {path:'**', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

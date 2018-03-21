import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { UserService } from './user.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';

const routes: Routes = [
  {
    path: 'me', component: UserDashboardComponent, data: {title: "my profile"}
  }, {
    path: 'users', component: UserListComponent, data: {title: "users"}
  }, {
    path: 'profile', component: UserDetailComponent, data: {title: "profile"}
  }
]
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes) // this is important, otherwise won't work
  ],
  declarations: [UserDashboardComponent, UserDetailComponent, UserListComponent, UserListItemComponent],
  providers: [UserService]
})
export class UserModule { }

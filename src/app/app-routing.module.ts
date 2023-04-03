import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowUserComponent } from './follow-user/follow-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'view-user/:user', component: ViewUserComponent },
  { path: 'follow-user', component: FollowUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

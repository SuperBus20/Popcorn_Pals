import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowUserComponent } from './follow-view-user/follow-view-user.component';
import { HomeComponent } from './home/home.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'view-user/:username', component: ViewUserComponent },
  { path:'view-user', component: ViewUserComponent},
  { path: 'follow-user', component: FollowUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

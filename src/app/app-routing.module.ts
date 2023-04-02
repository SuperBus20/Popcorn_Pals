import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowUserComponent } from './follow-user/follow-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ReviewFormComponent } from './review-form/review-form.component';

const routes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'view-user', component: ViewUserComponent },
  { path: 'follow-user', component: FollowUserComponent },
  { path: 'app-reviews/:movieId', component: ReviewFormComponent }, //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowUserComponent } from './follow-user/follow-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';

const routes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'view-user/:username', component: ViewUserComponent },
  { path:'view-user', component: ViewUserComponent},
  { path: 'follow-user', component: FollowUserComponent },
  { path: 'app-review-detail', component: ReviewDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

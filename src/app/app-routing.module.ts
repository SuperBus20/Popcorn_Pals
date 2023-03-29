import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'view-user', component: ViewUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

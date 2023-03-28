import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { MediaComponent } from './media/media.component';

const routes: Routes = [
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'search', component: MediaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

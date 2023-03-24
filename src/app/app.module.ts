import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
<<<<<<< HEAD
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReviewsComponent } from './reviews/reviews.component';
=======
import { MediaComponent } from './media/media.component';
>>>>>>> 0359a16609a61fd508feb9d6e17dc01ebb441f36
=======
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MediaComponent } from './media/media.component';
>>>>>>> 097fa5dd06e13b093caef3d18aa2a30a3fdf3b40

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    UserProfileComponent,
    ReviewsComponent
=======
    MediaComponent
>>>>>>> 0359a16609a61fd508feb9d6e17dc01ebb441f36
=======
    UserProfileComponent,
    ReviewsComponent
    MediaComponent
>>>>>>> 097fa5dd06e13b093caef3d18aa2a30a3fdf3b40
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

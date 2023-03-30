import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MediaComponent } from './media/media.component';
import { FollowUserComponent } from './follow-user/follow-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    ReviewsComponent,
    MediaComponent,
    UserProfileComponent,
    ReviewsComponent,
    FollowUserComponent
  ],

  imports: [
    BrowserModule, //display in browser - default
    AppRoutingModule, //where I'm routing paths - default
    HttpClientModule, //setting up http client to call out eternal stuff
    FormsModule //forms to submit reviews and create profile
  ],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

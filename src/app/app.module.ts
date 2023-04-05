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
import { FollowUserComponent } from './follow-view-user/follow-view-user.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ApiService } from './api.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FollowUserProfileComponent } from './follow-user-profile/follow-user-profile.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    ReviewsComponent,
    MediaComponent,
    UserProfileComponent,
    ReviewsComponent,
    FollowUserComponent,
    UserUpdateComponent,
    SearchUserComponent,
    ViewUserComponent,
    FavoriteComponent,
    FollowUserProfileComponent,
    HomeComponent


  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    YouTubePlayerModule,
    FormsModule
  ],

  providers: [ApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }

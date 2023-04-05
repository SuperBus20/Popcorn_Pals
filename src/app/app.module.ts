import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { MediaComponent } from './media/media.component';
import { FollowUserComponent } from './follow-user/follow-user.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ApiService } from './api.service';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FollowUserProfileComponent } from './follow-user-profile/follow-user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    ReviewFormComponent,
    MediaComponent,
    UserProfileComponent,
    ReviewFormComponent,
    FollowUserComponent,
    UserUpdateComponent,
    SearchUserComponent,
    ViewUserComponent,
    FavoriteComponent,
    ReviewDetailComponent,
    StarRatingComponent,
    FollowUserProfileComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    YouTubePlayerModule
  ],

  providers: [ApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }

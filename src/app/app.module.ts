import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserLoginComponent } from './user-login/user-login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReviewsComponent } from './reviews/reviews.component';
=======
import { MediaComponent } from './media/media.component';
>>>>>>> 0359a16609a61fd508feb9d6e17dc01ebb441f36

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
<<<<<<< HEAD
    UserProfileComponent,
    ReviewsComponent
=======
    MediaComponent
>>>>>>> 0359a16609a61fd508feb9d6e17dc01ebb441f36
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

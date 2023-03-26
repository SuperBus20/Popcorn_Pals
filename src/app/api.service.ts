import { Injectable } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './Interfaces/user';
import { ILoggedInUser } from './Interfaces/LoggedinUser';
import { IUserReview } from './Interfaces/user-review';
import { IMovie, IShow, ISource } from './Interfaces/Media';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }
  userURI: string = 'https://localhost:7035/api/PopcornUser/';
  popCornUri: string = 'https://localhost:7035/api/Popcorn/';
  movieReview: string = 'https://localhost:7035/api/PopcornUser/';
  showReview: string = 'https://localhost:7035/api/PopcornUser/';
  loggedInUser: ILoggedInUser | null = null;
  
  @Output() loggedInEvent: EventEmitter<ILoggedInUser> = new EventEmitter<ILoggedInUser>();

// Media //
  getMovieByID(media_id: number) {
    return this.http.get<IMovie>(this.popCornUri + `movie?_id=${media_id}`);
  }

  getShowByID(media_id: number) {
    return this.http.get<IShow>(this.popCornUri + `show?_id=${media_id}`);
  }



// User //
  createUser(user: IUser) {
    // api call to add the newly registered user, only used by login component
    let userName = user.userName;
    let password = user.password;
    return this.http
      .post<IUser>(
        this.userURI + `createUser?userName=${userName}&password=${password}`,
        user
      )
      .subscribe((x) => {
        this.loggedInUser = {
          User: x,
          UserReview: []
          //Favorites: []
        };
        this.onComponentLoad()
      });
  }

  getUser(user: IUser) {
    // api call to get the user that logged in, only used by login component
    let userName = user.userName;
    let password = user.password;
    return this.http
      .get<IUser>(this.userURI + `Login?userName=${userName}&password=${password}`)
      .subscribe((x) => {
        this.loggedInUser = {
          User: x,
          UserReview: []

        };
        this.onComponentLoad()
      });
  }

  setUser(currentUser: IUser) {
    // sets the currently logged in user in this service so that its globally available to all components, also only used by login component

    this.getUser(currentUser);
  }

  getAllUsers() {
    return this.http.get<IUser[]>(this.userURI, {});
  }

  onComponentLoad() {
    return this.loggedInEvent.emit(this.giveCurrentUser() as ILoggedInUser);
  }

  onLogout() {
    this.loggedInUser = null;
    this.onComponentLoad();
  }

  giveCurrentUser() { // provides the currently logged in user or null to components so they can provide the appropriate functionality, used by any component that needs this data
    return this.loggedInUser as ILoggedInUser;
  }



// Review //
  addMovieReview(movieReview: IUserReview) {
    let userId = movieReview.UserId;
    let mediaId = movieReview.MediaId;
    let review = movieReview.Review;
    let rating = movieReview.Rating;
    return this.http
      .post<IUserReview>(
        this.movieReview +
        `AddMovieReview?userId=${userId}&mediaId=${mediaId}&review=${review}&rating=${rating}`,
        movieReview
      )
      .subscribe(() => { Response });
  }

  addShowReview(showReview: IUserReview) {
    let userId = showReview.UserId;
    let mediaId = showReview.MediaId;
    let review = showReview.Review;
    let rating = showReview.Rating;
    return this.http
      .post<IUserReview>(
        this.showReview +
        `AddShowReview?userId=${userId}&mediaId=${mediaId}&review=${review}&rating=${rating}`,
        showReview
      )
      .subscribe(() => { });
  }

  getReviewByMediaId(mediaId: number) {
    return this.http.get<IUserReview>(this.userURI + `GetReviewByMediaId?mediaId=${mediaId}`)
  }

  getReviewByUserId(userId: number) {
    return this.http.get<IUserReview>(this.userURI + `GetReviewByUserId?userId=${userId}`)
  }

  getReviewByReviewId(reviewId: number) {
    return this.http.get<IUserReview>(this.userURI + `GetReviewByReviewId?mediaId=${reviewId}`)
  }



// Follow //
  getFollowers(user: IUser) {
    let id = user.UserId
    return this.http.get<IUser>(this.userURI + `GetFollowers?userId=${id}`);
  }

  getFollowing(user: IUser) {
    let id = user.UserId
    return this.http.get<IUser>(this.userURI + `GetFollowing?userId=${id}`);
  }

  followUser(user: IUser, toFollow: IUser) {
    let userId = user.UserId;
    let userToFollow = toFollow.UserId
    return this.http.get<IUser>(
      this.userURI +
      `FollowUser?userId=${userId}&userToFollow=${userToFollow}`
    );
  }

}

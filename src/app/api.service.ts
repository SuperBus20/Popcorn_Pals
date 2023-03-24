import { Injectable } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './Interfaces/user';
import { ILoggedInUser } from './Interfaces/LoggedinUser';
import { IUserReview } from './Interfaces/user-review';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  userURI: string = 'https://localhost:7035/api/PopcornUser/';

  movieUri: string = 'https://localhost:7035/api/Popcorn/';
  movieReview: string = 'https://localhost:7035/api/PopcornUser/';
  showReview: string = 'https://localhost:7035/api/PopcornUser/';
  loggedInUser: ILoggedInUser | null = null;

  searchMedia(searchTitle: string, type: string) {
    return this.http.get(
      this.movieUri + `search?title=${searchTitle}&type=${type}`
    );
  }

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
      .subscribe(() => {});
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
      .subscribe(() => {});
  }

  getMediaReview(mediaId: number)
  {
    return this.http.get<IUserReview>(this.userURI+`GetMediaReview?mediaId=${mediaId}`)
  }

  createUser(user: IUser) {
    // api call to add the newly registered user, only used by login component
    let userName = user.UserName;
    let password = user.Password;
    return this.http
      .post<IUser>(
        this.userURI + `createUser?userName=${userName}&password=${password}`,
        user
      )
      .subscribe((x) => {
        this.loggedInUser = {
          User: x,
          UserReview: [],
          //Favorites: []
        };
        //this.onComponentLoad()
      });
  }

  getUser(user: IUser) {
    // api call to get the user that logged in, only used by login component
    let userName = user.UserName;
    let password = user.Password;
    return this.http
      .get<IUser>(this.userURI + `Login/${userName}/${password}`)
      .subscribe((x) => {
        let user: IUser;
        if (x) {
        }
      });
  }

  getFollowers(user: IUser) {
    let id=user.UserId
    return this.http.get<IUser>(this.userURI + `GetFollowers?userId=${id}`);
  }

  getFollowing(user: IUser) {
    let id=user.UserId
    return this.http.get<IUser>(this.userURI + `GetFollowing?userId=${id}`);
  }

  followUser(user:IUser, toFollow: IUser) {
    let userId=user.UserId;
    let userToFollow=toFollow.UserId
    return this.http.get<IUser>(
      this.userURI +
        `FollowUser?userId=${userId}&userToFollow=${userToFollow}`
    );
  }

  setUser(currentUser: IUser) {
    // sets the currently logged in user in this service so that its globally available to all components, also only used by login component

    this.getUser(currentUser);
  }
}

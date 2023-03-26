import { Injectable } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './Interfaces/user';
import { ILoggedInUser } from './Interfaces/LoggedinUser';
import { IUserReview } from './Interfaces/user-review';
import { IMovie, IShow ,ISource} from './Interfaces/Media';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  userURI: string = 'https://localhost:7035/api/PopcornUser/';

  popCornUri: string = 'https://localhost:7035/api/Popcorn/';
  movieReview: string = 'https://localhost:7035/api/PopcornUser/';
  showReview: string = 'https://localhost:7035/api/PopcornUser/';
  loggedInUser: ILoggedInUser | null = null;
  @Output() loggedInEvent: EventEmitter<ILoggedInUser> = new EventEmitter<ILoggedInUser>();

  selectFavoriteMovie(movieId: number) {

    let userId = -1;
    let user = this.loggedInUser as ILoggedInUser;
    if (user) {
      userId = user.User.UserId;
      let favorites = user.FavoriteMovies;
      let movie = favorites.filter(x => x._id === movieId)[0];
      let indexNumber = favorites.indexOf(movie);
      let length = favorites.length;
      if (user.FavoriteMovies.some(x => x._id === movieId)) {
        favorites = favorites.slice(0, (Math.abs(indexNumber)))
          .concat(favorites.slice(-Math.abs(length - indexNumber)));
        this.removeFavoriteMovie(userId, movieId);


      } else {
        this.http.post<IMovie>(this.popCornUri + `FavoriteMovie/${movieId}/${userId}'`, {}).subscribe(
          (x)=>{
            if(x){
              this.setUser(user.User)
              return this.onComponentLoad()
            }
      });
      }
    }
  }
  removeFavoriteMovie(userId: number, movieId: number) {
    return this.http.post<boolean>(this.popCornUri+ `DeleteFavoriteMovie/${userId}/${movieId}`, {})
    .subscribe(
      (x) => {
        if(x) {
          this.setUser(this.giveCurrentUser().User)
          return this.onComponentLoad();
        }
    })
  }


  selectFavoriteShow(showId: number) {

    let userId = -1;
    let user = this.loggedInUser as ILoggedInUser;
    if (user) {
      userId = user.User.UserId;
      let favorites = user.FavoriteShows;
      let show = favorites.filter(x => x._id === showId)[0];
      let indexNumber = favorites.indexOf(show);
      let length = favorites.length;
      if (user.FavoriteMovies.some(x => x._id === showId)) {
        favorites = favorites.slice(0, (Math.abs(indexNumber)))
          .concat(favorites.slice(-Math.abs(length - indexNumber)));
        this.removeFavoriteShow(userId, showId);


      } else {
        this.http.post<IMovie>(this.popCornUri + `FavoriteShow/${showId}/${userId}'`, {}).subscribe(
          (x)=>{
            if(x){
              this.setUser(user.User)
              return this.onComponentLoad()
            }
      });
      }
    }
  }

  removeFavoriteShow(userId: number, showId: number) {
    return this.http.post<boolean>(this.popCornUri+ `DeleteFavoriteShow/${userId}/${showId}`, {})
    .subscribe(
      (x) => {
        if(x) {
          this.setUser(this.giveCurrentUser().User)
          return this.onComponentLoad();
        }
    })
  }

  getLoggedInUserFavoriteMovies(user:IUser) {

    return this.http.get<IMovie[]>(this.popCornUri + `GetFavoriteMovies/${user.UserId}`)
    .subscribe(
      (x) => {
        if(x){
          this.loggedInUser = {
            User: user ,
            UserReview: [],
            FavoriteMovies: [],
            FavoriteShows: []
          }
        }else{
          this.loggedInUser = {
            User: user ,
            UserReview: [],
            FavoriteMovies: [],
            FavoriteShows: []
          }
        }
        return this.loggedInEvent.emit(this.giveCurrentUser() as ILoggedInUser);
    });
}
getLoggedInUserFavoriteShows(user:IUser) {

  return this.http.get<IMovie[]>(this.popCornUri + `GetFavoriteShows/${user.UserId}`)
  .subscribe(
    (x) => {
      if(x){
        this.loggedInUser = {
          User: user ,
          UserReview: [],
          FavoriteMovies: [],
          FavoriteShows: []
        }
      }else{
        this.loggedInUser = {
          User: user ,
          UserReview: [],
          FavoriteMovies: [],
          FavoriteShows: []
        }
      }
      return this.loggedInEvent.emit(this.giveCurrentUser() as ILoggedInUser);
  });
}

 getMovieByID(media_id:number)
 {
  return this.http.get<IMovie>(this.popCornUri+`movie?_id=${media_id}`);
 }

 getShowByID(media_id:number)
 {
  return this.http.get<IShow>(this.popCornUri+`show?_id=${media_id}`);
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
      .subscribe(() => {Response});
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


  getMediaReview(mediaId: number)
  {
    return this.http.get<IUserReview>(this.userURI+`GetMediaReview?mediaId=${mediaId}`)
  }

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
          User: x ,
          UserReview: [],
          FavoriteMovies: [],
          FavoriteShows: []

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
      .subscribe((x) => { this.loggedInUser = {
        User: x ,
        UserReview: [],
        FavoriteMovies: [],
        FavoriteShows: []


      };
      this.onComponentLoad()
    });
  }




  // getUser(user: IUser) {
  //   // api call to get the user that logged in, only used by login component
  //   let userName = user.userName;
  //   let password = user.password;
  //   return this.http
  //     .get<IUser>(this.userURI + `Login?userName=${userName}&password=${password}`)
  //     .subscribe((x) => {
  //       let user:IUser;
  //       if(x){
  //         user=x;
  //         this.getLoggedInUserFavoriteMovies(user)
  //         this.getLoggedInUserFavoriteShows(user)
  //       }

  //     });
  // }





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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { IMovie, IShow, ISource } from '../Interfaces/Media';
import { HttpClient } from '@angular/common/http';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent {
  constructor(private api: ApiService, private http: HttpClient) {}
  // ngOnInit(): void {
  // }

  movie: IMovie | null = null;
  show: IShow | null = null;
  loggedInUser: ILoggedInUser | null = null;

  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchString!: string;
  searchType!: string;
  movieResults!: IMovie[];
  showResults!: IShow[];
  isMovie: boolean = false;
  isShow: boolean = false;
  selectedMovie!: any;
  selectedShow!: any;
  selectedMedia: boolean = false;
  favoriteMovies: IMovie[] = [];
  favoriteShows: IShow[] = [];
  isFavorite: boolean = false;



  searchMedia(form: NgForm) {
    this.searchString = form.value.searchString;
    this.searchType = form.value.searchType;

    if ((this.searchType === 'movie')) {
      this.isMovie = true;
      this.isShow = false;
      this.http
        .get<IMovie[]>(
          this.api.popCornUri + `search?title=${this.searchString}&type=movie`
        )
        .subscribe((response) => {
          this.movieResults = response;
        });
    }
    else if ((this.searchType === 'show')) {
      this.isShow = true;
      this.isMovie = false;
      this.http
        .get<IShow[]>(
          this.api.popCornUri + `search?title=${this.searchString}&type=show`
        )
        .subscribe((response) => {
          this.showResults = response;
        });
    }
    this.selectedMedia=false;
    form.resetForm();
  }



  selectId(mediaId:number, mediaType:string) {
    if(mediaType==="movie")
    {
      this.selectedShow=null;
      this.selectedMedia=true;
       this.api.getMovieByID(mediaId).subscribe((response) => {
        this.selectedMovie = response;
      });
      this.checkFavoriteMovie(mediaId);
    }
    else if(mediaType==="show")
    {
      this.selectedMovie=null;
      this.selectedMedia=true;
      this.api.getShowByID(mediaId).subscribe((response) => {
        this.selectedShow = response;
      });
      this.checkFavoriteShow(mediaId);
    }
  }


  checkFavoriteMovie(mediaId: number) {
    // check if the item is in the favorites array
    const index = this.favoriteMovies.findIndex((x) => x._id === mediaId);
    if (index !== -1) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
    return mediaId;
  }
  checkFavoriteShow(mediaId: number) {
    // check if the item is in the favorites array
    const index = this.favoriteShows.findIndex((x) => x._id === mediaId);
    if (index !== -1) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
    return mediaId;
  }




//MOVIE STUFF
  addFavoriteMovie(movieId: number) {
    let userId = -1;
    let user = this.loggedInUser as ILoggedInUser;
    userId = user.User.userId;
    this.isFavorite = true;
    this.http
      .post<IMovie>(
        this.api.userURI + `FavoriteMovie?movieId=${movieId}&userId=${userId}`,
        {}
      )
      .subscribe((response) => {
        console.log('Item added to database');
      });
  }
  removeFavoriteMovie(movieId: number) {
    let userId = -1;
    let user = this.loggedInUser as ILoggedInUser;
    userId = user.User.userId;
    this.isFavorite = false;
    this.api.removeFavoriteMovie(userId, movieId);
  }
//SHOW STUFF
  addFavoriteShow(showId: number) {
    let userId = -1;
    let user = this.loggedInUser as ILoggedInUser;
    userId = user.User.userId;
    this.isFavorite = true;
    this.http
      .post<IShow>(
        this.api.userURI + `FavoriteShow/${showId}/${userId}`,
        {}
      )
      .subscribe((response) => {
        console.log('show added to database');
      });
  }

  removeFavoriteShow(showId: number) {
    let userId = -1;
    let user = this.loggedInUser as ILoggedInUser;
    userId = user.User.userId;
    this.isFavorite = false;
    this.api.removeFavoriteShow(userId, showId);
  }




  ngOnInit(): void {
    this.api.loggedInEvent.subscribe(
      (x) => {this.loggedInUser = x as ILoggedInUser
        this.api.getUserFavoriteMovies(x.User).subscribe((movies)=>this.favoriteMovies=movies)
        // this.api.getUserFavoriteShows(x.User).subscribe((shows)=>this.favoriteShows=shows)
        }
    );
  }
}

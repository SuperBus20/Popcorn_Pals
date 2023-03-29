import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { IMovie, IShow, ISource } from '../Interfaces/Media';
import { HttpClient } from '@angular/common/http';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent {
  constructor(private api: ApiService, private http: HttpClient) {}
  // ngOnInit(): void {
  // }

  @Input() movie: IMovie | null = null;
  @Input() show: IShow | null = null;
  loggedInUser: ILoggedInUser | null = this.api.loggedInUser;
  @Input() index: number = 0;
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

  //MediaId: number = 1; //testing?
  searchMedia(form: NgForm) {
    this.searchString = form.value.searchString;
    this.searchType = form.value.searchType;

    if ((this.searchType == 'movie')) {
      this.isMovie = true;
      this.http
        .get<IMovie[]>(
          this.api.popCornUri + `search?title=${this.searchString}&type=movie`
        )
        .subscribe((response) => {
          this.movieResults = response;
        });
    }
    if ((this.searchType == 'show')) {
      this.isShow = true;
      this.http
        .get<IShow[]>(
          this.api.popCornUri + `search?title=${this.searchString}&type=show`
        )
        .subscribe((response) => {
          this.showResults = response;
        });
    }
  }

  selectMovieId(mediaId: number) {
      this.api.getMovieByID(mediaId).subscribe((response) => {
        this.selectedMovie = response;
      });
  }

  selectShowId(mediaId: number) {
      this.api.getShowByID(mediaId).subscribe((response) => {
        this.selectedShow = response;
      });
    }
    // this.http.get<IMovie>(this.api.popCornUri+`movie?_id=${movieId}`)
    // .subscribe(response => {
    //   this.selectedMedia = response;
    // });
    // this.selectedMedia=movieId;
    // console.log(this.selectedMedia);
  

  // favoriteMovieClicked() {
  //   this.movie = this.movie as IMovie
  //   this.api.selectFavoriteMovie(this.movie._id);
  //   return this.clicked.emit(true);

  // }
  favoriteShowClicked() {
    this.show = this.show as IShow;
    this.api.selectFavoriteShow(this.show._id);
    return this.clicked.emit(true);
  }

  addFavoriteMovie(movieId: Number) {
    let userId = -1;
    let user = this.loggedInUser as ILoggedInUser;
    userId = user.User.userId;
    this.http
      .post<IMovie>(
        this.api.userURI + `FavoriteMovie?movieId=${movieId}&userId=${userId}`,
        {}
      )
      .subscribe((response) => {
        console.log('Item added to database');
      });

    //   .subscribe(
    //     (x)=>{
    //       if(x){
    //         this.api.setUser(user.User)
    //         return this.api.onComponentLoad()
    //       }
    // });
  }
  addFavoriteShow(showId: Number) {
    let userId = -1;
    let user = this.loggedInUser as ILoggedInUser;
    userId = user.User.userId;
    this.http
      .post<IShow>(
        this.api.userURI + `FavoriteShow?showId=${showId}&userId=${userId}`,
        {}
      )
      .subscribe((response) => {
        console.log('Item added to database');
      });

    //   .subscribe(
    //     (x)=>{
    //       if(x){
    //         this.api.setUser(user.User)
    //         return this.api.onComponentLoad()
    //       }
    // });
  }

  ngOnInit(): void {
    this.api.loggedInEvent.subscribe(
      (x) => (this.loggedInUser = x as ILoggedInUser)
    );
  }
}

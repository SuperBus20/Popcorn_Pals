import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { IMovie, IShow, ISource } from '../Interfaces/Media';
import { HttpClient } from '@angular/common/http';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent {
  displayReview: boolean = false;
  constructor(private api: ApiService, private http: HttpClient, 
    private route: Router) {}
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

  //MediaId: number = 1; //testing?
  searchMedia(form: NgForm) {
    this.searchString = form.value.searchString;
    this.searchType = form.value.searchType;

    if ((this.searchType == 'movie')) {
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
    if ((this.searchType == 'show')) {
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
  }

  selectId(mediaId:number, mediaType:string) {
    if(mediaType==="movie")
    {
      this.selectedMedia=true;
       this.api.getMovieByID(mediaId).subscribe((response) => {
        this.selectedMovie = response;
      });
      this.selectedMedia=true;
    }
    else if(mediaType==="show")
    {
      this.selectedMedia=true;
      this.api.getShowByID(mediaId).subscribe((response) => {
        this.selectedShow = response;
      });
      this.selectedMedia=true;
    }
  }

  onPress() {
    if(this.displayReview == true)
    {
      this.displayReview = false
    }
    else
    {
      this.displayReview = true
    }
  }
  
  // Add or Edit Review // - Directs user to review form when viewing media
  goToMovieReviewForm(movieId: any) {
    let userId = this.loggedInUser;
    this.route.navigate([
      '/app-review-form/', movieId, userId, 
    ])
  }

  goToShowReviewForm(showId: any) {
    let userId = this.loggedInUser;
    this.route.navigate([
      '/app-review-form/', showId, userId, 
    ])
  }

  goToEditShowReviewForm(showId: any) {
    let userId = this.loggedInUser;
    this.route.navigate([
      '/app-review-form/', showId, userId, 
    ])
  }

  goToEditMovieReviewForm(movieId: any) {
    let userId = this.loggedInUser;
    this.route.navigate([
      '/app-review-form/', movieId, userId, 
    ])
  }

  navigate(url:string) {
    window.open(url);
  }
  

  // Add as Favorite
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

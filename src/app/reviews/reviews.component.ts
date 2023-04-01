import { Component, Input } from '@angular/core';
import { IUserReview } from '../Interfaces/user-review';
import { MediaComponent } from '../media/media.component';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { IMovie, IShow } from '../Interfaces/Media';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent {
  constructor(private Api: ApiService) { }

  userId: any;
  MediaId: number = -1;
  movieId: number = -1
  movie: IMovie | any;
  show: IShow | any;
  // isMovie: boolean = false;
  // isShow: boolean = false;
  loggedInUser: ILoggedInUser | undefined;
  Review: string = "" ;
  Rating: number = -1 ;
  Id: number = -1;

  selectedMovie!: any;
  selectedShow!: any;
  selectedMedia: boolean = false;

  ngOnInit(): void {
    this.userId = this.Api.loggedInUser?.User.userId
  }

  // Adding Reviews //
  addMovieReview(form: NgForm) {
    let user = this.loggedInUser as ILoggedInUser;
    this.userId = user.User.userId;
    
    let newReview: IUserReview = {
      Id: this.Id, 
      userId: this.userId,
      Review: form.form.value.Review,
      Rating: form.form.value.Rating,
      MediaId: this.movieId,
    };

    this.Api.addMovieReview(newReview)
    form.resetForm();
  }


  // addShowReview(form: NgForm) {
  //   // Old Code //
  //   //   let newReview: IUserReview = {
  //   //   Id: -1, 
  //   //   userId: this.UserId,
  //   //   MediaId: this.MediaId,
  //   //   Review: form.form.value.Review,
  //   //   Rating: form.form.value.Rating
  //   // };
  //   let userId = -1;
  //   let user = this.loggedInUser as ILoggedInUser;
  //   let MediaId = this.movie._id;
  //   userId = user.User.userId;
    
  //   let newReview: IUserReview = {
  //     Id: -1,
  //     userId: userId,
  //     MediaId: this.MediaId, //changed
  //     Review: form.form.value.Review,
  //     Rating: form.form.value.Rating
  //   };

  //   this.isMovie == true; //added

  //   this.Api.addMovieReview(newReview)
  //   form.resetForm();
  // }

  // Edit Reviews // //TODO: add this schtuff
  editMovieReview(){}

  editMovieRating(){}

  editShowReview(){}

  editShowRating(){}

  // Delete Reviews //TODO: add this schtuff


  // Get Reviews //
  getAllReviews()
  {
    this.Api.getAllReviews().subscribe();
  }

  getReviewByMediaId(MediaId: number)
  {
    this.Api.getReviewByMediaId(this.MediaId).subscribe();
  }

  getReviewByUserId(userId: number)
  {
    this.Api.getReviewByUserId(this.userId).subscribe();
  }

  getReviewByReviewId(Id:number) //updated
  {
    this.Api.getReviewByReviewId(this.Id).subscribe(); //updated
  }

}

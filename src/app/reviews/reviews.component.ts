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

  @Input() mediaId: any;

  constructor(private Api: ApiService) { }

  userId: any;
  movieId: number = -1
  movie: IMovie | any;
  show: IShow | any;
  // isMovie: boolean = false;
  // isShow: boolean = false;
  loggedInUser: ILoggedInUser | undefined;
  Review: string = "" ;
  Rating: number = -1 ;
  Id: number = -1;

  // selectedMovie!: any;
  // selectedShow!: any;
  // selectedMedia: boolean = false;

  ngOnInit(): void {
    this.userId = this.Api.loggedInUser?.User.userId
  }

  // Adding Reviews //
  addMovieReview(form: NgForm) {
    let user = this.loggedInUser as ILoggedInUser;
    this.userId = user.User.userId;
    
    let newMovieReview: IUserReview = {
      userId: this.userId,
      Review: form.form.value.Review,
      Rating: form.form.value.Rating,
      MediaId: this.movieId,
    };

    this.Api.addMovieReview(newMovieReview)
    form.resetForm();
  }

  addShowReview(form: NgForm) {
    let user = this.loggedInUser as ILoggedInUser;
    this.userId = user.User.userId;
    
    let newShowReview: IUserReview = {
      userId: this.userId,
      Review: form.form.value.Review,
      Rating: form.form.value.Rating,
      MediaId: this.show.Id,
    };

    this.Api.addShowReview(newShowReview)
    form.resetForm();
  }

  // // Edit Reviews // //TODO: add this schtuff
  // editReview(form: NgForm, reviewId: number) {
  //   let user = this.loggedInUser as ILoggedInUser;
  //   this.userId = user.User.userId;
    
  //   let showReviewToEdit : IUserReview = {
  //     userId: this.userId,
  //     Review: form.form.value.Review,
  //     Rating: form.form.value.Rating,
  //     MediaId: this.show.Id,
  //   };

  //   this.Api.editReview(showReviewToEdit)
  //   form.resetForm();
  
  // }


  // Delete Reviews //TODO: add this schtuff
  deleteReview(reviewId: number) {
    this.Api.getReviewByUserId(this.userId).subscribe();
  }


  // Get Reviews //
  getAllReviews() {
    this.Api.getAllReviews().subscribe();
  }

  // getReviewByMediaId(MediaId: number)
  // {
  //   this.Api.getReviewByMediaId(this.MediaId).subscribe();
  // }

  getReviewByUserId(userId: number) {
    this.Api.getReviewByUserId(this.userId).subscribe();
  }

  getReviewByReviewId(reviewId:number) {
    this.Api.getReviewByReviewId(this.Id).subscribe();
  }

}

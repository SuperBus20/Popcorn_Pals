import { Component, Input } from '@angular/core';
import { IUserReview } from '../Interfaces/user-review';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { IMovie, IShow } from '../Interfaces/Media';
import { Router } from '@angular/router';
import { StarRatingColor } from '../star-rating/star-rating.component';
import { MediaComponent } from '../media/media.component';
import { ReviewDetailComponent } from '../review-detail/review-detail.component';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})

export class ReviewFormComponent {

  @Input() mediaId: any;
  @Input() selectedMovie: any;
  @Input() selectedShow: any;
  @Input() isMovie: any;
  @Input() isShow: any;
  @Input() mediaTitle: any;
  @Input() mediaTypeResult: any;

  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(private Api: ApiService) {}

  userId: any;
  movieId: number = -1
  movie: IMovie | any;
  show: IShow | any;
  loggedInUser: ILoggedInUser | null = null;
  Review: string = "" ;
  Id: number = -1;
  hasUserReviewed: boolean = false;
  
  ngOnInit(): void {
    this.userId = this.Api.loggedInUser?.User.userId
    console.log(this.selectedMovie)
    console.log(this.selectedShow)
    console.log(this.isMovie)
    console.log(this.isShow)
  }

  onRatingChanged(rating: number){
    console.log(rating);
    this.rating = rating;
  }

  // Add Reviews //
  addMovieReview(form: NgForm) {
    // this.isReviewed = true;
    let newMovieReview: IUserReview = {
      userId: this.userId,
      Rating: this.rating,
      Review: form.form.value.Review,
      MediaId: this.mediaId,
    };
    this.Api.addMovieReview(newMovieReview)
    form.resetForm();
  }

  addShowReview(form: NgForm) {
    // this.isReviewed = true;
    let newShowReview: IUserReview = {
      userId: this.userId,
      Rating: this.rating,
      Review: form.form.value.Review,
      MediaId: this.mediaId,
    };
    this.Api.addShowReview(newShowReview)
    form.resetForm();
  }

  hasReviewed(mediaId: number, userId: number, mediaType:string) {

  }
  
  // deleteReview(reviewId: number) {
  //   let userId = -1;
  //   let user = this.loggedInUser as ILoggedInUser;
  //   userId = user.User.userId;
  //   this.Api.deleteReview(userId, reviewId);
  // }


  // public bool hasUserReviewed (int mediaId, int userId, string mediaType) 
// {
//   int reviewId = GetReviewId(mediaId, userId, mediaType);
//   if (reviewId > 0) {
//     return true;
//   }
//   return false;
// }

  // public void DeleteReview(UserReview reviewId)
  // {
  //   UserReview? deleteReview = _popContext.Reviews
  //   .Where(x => x.Id == reviewId.Id).FirstOrDefault();

  //   UserReview reviewToDelete = reviewId;
  //   _popContext.Reviews.Remove(deleteReview);
  //   _popContext.SaveChanges();
  // }
}
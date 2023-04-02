import { Component, Input } from '@angular/core';
import { IUserReview } from '../Interfaces/user-review';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { IMovie, IShow } from '../Interfaces/Media';
import { Router } from '@angular/router';
import { StarRatingColor } from '../star-rating/star-rating.component';

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
  loggedInUser: ILoggedInUser | undefined;
  Review: string = "" ;
  Id: number = -1;
  
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
    let newMovieReview: IUserReview = {
      userId: this.userId,
      Review: form.form.value.Review,
      Rating: this.rating,
      MediaId: this.mediaId,
    };

    this.Api.addMovieReview(newMovieReview)
    form.resetForm();
  }

  addShowReview(form: NgForm) {
    let newShowReview: IUserReview = {
      userId: this.userId,
      Review: form.form.value.Review,
      Rating: this.rating,
      MediaId: this.mediaId,
    };

    this.Api.addShowReview(newShowReview)
    form.resetForm();
  }

  // Edit Reviews //

  editShowReview(form: NgForm, showId: number, userId: number) {
    let showReviewToEdit : IUserReview = {
      userId: this.userId,
      Review: form.form.value.Review,
      Rating: form.form.value.Rating,
      MediaId: this.show.Id,
    };

    s

    this.Api.editShowReview(showReviewToEdit)
    form.resetForm();
  }

}

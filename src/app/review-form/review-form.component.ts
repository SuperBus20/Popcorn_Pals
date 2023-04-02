import { Component, Input } from '@angular/core';
import { IUserReview } from '../Interfaces/user-review';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { IMovie, IShow } from '../Interfaces/Media';
import { Router } from '@angular/router';

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

  constructor(private Api: ApiService) {}

  userId: any;
  movieId: number = -1
  movie: IMovie | any;
  show: IShow | any;
  loggedInUser: ILoggedInUser | undefined;
  Review: string = "" ;
  Rating: number = -1 ;
  Id: number = -1;
  

  ngOnInit(): void {
    this.userId = this.Api.loggedInUser?.User.userId
    console.log(this.selectedMovie)
    console.log(this.selectedShow)
    console.log(this.isMovie)
    console.log(this.isShow)
  }

  // Add Reviews //

  userReviewedShow(id: number) {
    
  }

  userReviewedShow(id: number) {
    
  }


  addMovieReview(form: NgForm) {
    let newMovieReview: IUserReview = {
      userId: this.userId,
      Review: form.form.value.Review,
      Rating: form.form.value.Rating,
      MediaId: this.mediaId,
    };

    this.Api.addMovieReview(newMovieReview)
    form.resetForm();
  }

  addShowReview(form: NgForm) {
    let newShowReview: IUserReview = {
      userId: this.userId,
      Review: form.form.value.Review,
      Rating: form.form.value.Rating,
      MediaId: this.mediaId,
    };

    this.Api.addShowReview(newShowReview)
    form.resetForm();
  }

  // Edit Reviews //

  editMovieReview(form: NgForm) {
    let movieReviewToEdit : IUserReview = {
      userId: this.userId,
      Review: form.form.value.Review,
      Rating: form.form.value.Rating,
      MediaId: this.show.Id,
    };

    this.Api.editMovieReview(movieReviewToEdit)
    form.resetForm();
  }

  editShowReview(form: NgForm) {
    let showReviewToEdit : IUserReview = {
      userId: this.userId,
      Review: form.form.value.Review,
      Rating: form.form.value.Rating,
      MediaId: this.show.Id,
    };

    this.Api.editShowReview(showReviewToEdit)
    form.resetForm();
  }

}

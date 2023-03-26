import { Component, Input } from '@angular/core';
import { IUserReview } from '../Interfaces/user-review';
import { MediaComponent } from '../media/media.component';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent {

  //review: IUserReview | undefined;
  //rating: number = 0
  // Userid: number = 1

  constructor(private Api: ApiService) { }
  Movie: any;
  Show: any;
  UserId: number = -1 ;
  MediaId: number = -1 ;
  Review: string = "" ;
  Rating: number = -1 ;
  ReviewId: number = -1;

  // @Input() UserId: number = 1;
  // @Input() MediaId: number = 1;
  //@Input() ReviewId: number = 1; //review id

  addMovieReview(form: NgForm) {
    let newReview: IUserReview = {
      ReviewId: -1,
      UserId: this.UserId,
      MediaId: this.MediaId,
      Review: form.form.value.Review,
      Rating: form.form.value.Rating
    };

    this.Api.addMovieReview(newReview)
    form.resetForm();
  }

  getReviewByMediaId(MediaId: number)
  {
    this.Api.getReviewByMediaId(this.MediaId).subscribe();
  }

  getReviewByUserId(UserId: number)
  {
    this.Api.getReviewByUserId(this.UserId).subscribe();
  }

  getReviewByReviewId(ReviewId:number)
  {
    this.Api.getReviewByReviewId(this.ReviewId).subscribe();
  }
  
  editReview(){}

  editRating(){}


}

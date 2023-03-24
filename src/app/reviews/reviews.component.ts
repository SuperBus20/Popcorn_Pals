import { Component } from '@angular/core';
import { IUserReview } from '../Interfaces/user-review';
import { ApiService } from '../api.service';
import { IUser } from '../Interfaces/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent {

review: IUserReview | undefined;
rating: number = 0

constructor (private Api:ApiService) {}

addReview(form: NgForm){
let newReview : IUserReview = {
  MediaId: form.value.MediaId,
  id: form.value.id,
  UserId: form.value.userId,
  Review: form.value.review,
  Rating: form.value.rating,
}
this.Api.addMovieReview(newReview)
}

//update review

}

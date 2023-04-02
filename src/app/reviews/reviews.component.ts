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
  @Input() selectedMovie: any;
  @Input() selectedShow: any;
  @Input() isMovie: any;
  @Input() isShow: any;

  constructor(private Api: ApiService) { }

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

  // Adding Reviews //
  addMovieReview(form: NgForm) {
    console.log("testigfdafa")
    console.log(this.userId)
    
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


  // Delete Reviews
  deleteReview(Id: number) {
    this.Api.getReviewByUserId(this.Id).subscribe();
  }

  // Get Reviews //
  getAllReviews() {
    this.Api.getAllReviews().subscribe();
  }

  getReviewByUserId(userId: number) {
    this.Api.getReviewByUserId(this.userId).subscribe();
  }

  getReviewByReviewId(reviewId:number) {
    this.Api.getReviewByReviewId(this.Id).subscribe();
  }

}

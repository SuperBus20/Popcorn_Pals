import { Component, Input } from '@angular/core';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';
import { IMovie, IShow } from '../Interfaces/Media';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent {
  @Input() mediaId: any;
  @Input() selectedMovie: any;
  @Input() selectedShow: any;
  @Input() isMovie: any;
  @Input() isShow: any;
  @Input() mediaTitle: any;
  reviewstest: any;

  constructor(private Api: ApiService,
    private route: Router) { }

  userId: any;
  movieId: number = -1
  movie: IMovie | any;
  show: IShow | any;
  loggedInUser: ILoggedInUser | undefined;
  Review: string = "" ;
  Rating: number = -1 ;
  Id: number = -1;
  isEditingReview: boolean = false;
  isDeletingReview: boolean = false;
  

  ngOnInit(): void {

    this.userId = this.Api.loggedInUser?.User.userId
    this.getReviewByUserId(this.userId);
    console.log(this.selectedMovie)
    console.log(this.selectedShow)
    console.log(this.isMovie)
    console.log(this.isShow)
    console.log(this.reviewstest)
  }

  // Editing Review //
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

  // Delete Reviews //
  deleteReview(Id: number) {
    this.Api.getReviewByUserId(this.Id).subscribe();
  }

  // Get Reviews //
  getAllReviews() {
    this.Api.getAllReviews().subscribe();
  }

  getReviewByUserId(userId: number) {
    this.Api.getReviewByUserId(10).subscribe((x) => (this.reviewstest = x));
  }

  getReviewByReviewId(reviewId:number) {
    this.Api.getReviewByReviewId(this.Id).subscribe();
  }

}

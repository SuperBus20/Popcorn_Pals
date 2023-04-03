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
  ReviewId: number = 0;
  

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
  goToEditReviewForm(mediaId: any) {
    let userId = this.loggedInUser;
    this.route.navigate([
      '/app-review-form/', mediaId, userId, this.ReviewId 
    ])
  }

  navigate(url:string) {
    window.open(url);
  }

  // Delete Reviews //
  // deleteReview(Id: number) {
  //   this.Api.getReviewByUserId(this.Id).subscribe();
  // }

  // Get Reviews //

  getReviewByUserId(userId: number) {
    this.Api.getReviewsByUserId(10).subscribe((x) => (this.reviewstest = x));
  }

}

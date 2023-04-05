import { Component, Input } from '@angular/core';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';
import { IMovie, IShow } from '../Interfaces/Media';
import { Router } from '@angular/router';
import { IUserReview } from '../Interfaces/user-review';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent {
  @Input() public user: ILoggedInUser | undefined 

  //@Input() mediaId: any;
  // @Input() selectedMovie: any;
  // @Input() selectedShow: any;
  // @Input() isMovie: any;
  // @Input() isShow: any;
  // @Input() mediaTitle: any;
  // reviewstest: any;

  constructor(private Api: ApiService,
    private route: Router) { }

  userId: any;
  movieId: number = -1
  movie: IMovie | any;
  show: IShow | any;
  Review: string = "" ;
  Rating: number = -1 ;
  Id: number = -1;
  isEditingReview: boolean = false;
  isDeletingReview: boolean = false;
  ReviewId: number = 0;
  userReviews!: Observable<IUserReview[]>;
  

  ngOnInit(): void {
    this.getUserReviews(this.user?.User?.userId);
    console.log(this.user);
    // console.log(this.loggedInUser?.User);
    console.log(this.userReviews);
  
    debugger;

    // console.log(this.selectedMovie)
    // console.log(this.selectedShow)
    // console.log(this.isMovie)
    // console.log(this.isShow)
    // console.log(this.reviewstest)
  }

    // Edit Review //

  // getReviewId(number: mediaId, number: userId, string: mediaType)
  //   {
  //     if (mediaType == "movie") {
  //       int movieReviewId = _popContext.Reviews.Include(x => x.Movies).Where(x => x.Movies._id == mediaId && x.UserId == userId).Select(x => x.Id).FirstOrDefault();
  //       return movieReviewId;
  //     }
  //     else if (mediaType == "show") {
  //       int showReviewId = _popContext.Reviews.Include(x => x.Movies).Where(x => x.Shows._id == mediaId && x.UserId == userId).Select(x => x.Id).FirstOrDefault();
  //       return showReviewId;
  //     }
  //     else {
  //       return 0; //if this is 0, user doesn't have a review for selected media
  //     }
  //   }

  // goToEditReviewForm(mediaId: any) {
  //   let userId = this.loggedInUser;
  //   this.route.navigate([
  //     '/app-review-form/', mediaId, userId, this.ReviewId 
  //   ])
  // }

  navigate(url:string) {
    window.open(url);
  }
  
  // Get User Reviews //
 getUserReviews(userId: number | undefined) {
    if (userId != undefined) {
      const reviews$ = this.Api.getReviewsByUserId(userId);
      // this.userReviews = lastValueFrom(reviews$); //TODO: HALPME
    }
  }


}

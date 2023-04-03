using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Popcorn_Pals.Models;

namespace Popcorn_Pals.Services.Interfaces
{
  public interface IPopcornService
  {
   
    UserReview AddMovieReview(int userId, int movieId, string review, int rating);
    UserReview AddShowReview(int userId, int showId, string review, int rating);
    
    //UserReview GetReviewByReviewId(int reviewId);
    //List <UserReview> GetAllReviews();
    
    // List <UserReview> GetReviewsByUserId(int userId);
    // UserReview EditReview(string review, int rating);
    //void DeleteReview(UserReview deleteReview);

  }
}
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
    // UserReview AddShowReview(int userId, int showId, string review, int rating);
    // UserReview EditShowReview(int userId, int mediaId, string review, int rating);
    // UserReview DeleteShowReview(int userId, int mediaId, string review, int rating);
    // UserReview EditMovieReview(int userId, int mediaId, string review, int rating);
    // UserReview DeleteMovieReview(int userId, int mediaId, string review, int rating);
    // UserReview GetAllReviews();
    // UserReview GetReviewByMediaId(int mediaId);
    // UserReview GetReviewByUserId(int userId);
    // UserReview GetReviewByReviewId(int reviewId);
  }
}
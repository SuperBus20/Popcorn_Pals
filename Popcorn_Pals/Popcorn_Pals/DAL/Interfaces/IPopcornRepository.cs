using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Popcorn_Pals.Models;

namespace Popcorn_Pals.DAL.Interfaces
{
  public interface IPopcornRepository
  {
    public List<User> GetUsers();
    User GetUser(string userName);
    User AddUser(string userName, string password);
    User GetUserById(int id);


    // Review Methods //
    UserReview AddMovieReview(UserReview reviewToAdd);
    UserReview AddShowReview(UserReview reviewToAdd);
    List<UserReview> GetReviewByMediaId(int mediaId);
    List<UserReview> GetReviewByUserId(int userId);
    List<UserReview> GetReviewByReviewId(int id);


    // Follow Methods //
    Follow FollowUser(int user, int userToFollow);
    List<Follow> GetFollowers(int userId);
    List<Follow> GetFollowing(int userId);

    //Favorites Methods //
    void FavoriteMovie(int movieId, int userId);
    List<Movie> GetFavoriteMovies(int userId);
    
    Show FavoriteShow(int showId, int userId);
    
    List<Show> GetFavoriteShows(int userId);
    bool DeleteFavoriteMovieById(int userId, int mediaId);
    bool DeleteFavoriteShowById(int userId, int mediaId);





  }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Popcorn_Pals.Models;

namespace Popcorn_Pals.DAL.Interfaces
{
  public interface IPopcornRepository
  {
    // User Methods //
    List<User> GetUsers();
    User? GetUser(string userName);
    User AddUser(string userName, string password);
    User GetUserById(int id);
    bool UpdateUser(User userToUpdate);
    List<User> SearchUserByName(string userToSearch);


    // Review Methods //
    UserReview AddMovieReview(UserReview reviewToAdd);
    UserReview AddShowReview(UserReview reviewToAdd);
    void DeleteReview(UserReview reviewId);
    int GetReviewId(int mediaId, int userId, string mediaType);
    bool hasUserReviewed(int mediaId, int userId, string mediaType);
    List<UserReview> GetReviewsByUserId(int userId);
  

    // Follow Methods //
    Follow FollowUser(int user, int profile);
    Follow UnfollowUser(int user, int profile);
    List<Follow> GetAllFollowers(int userId);
    List<Follow> GetAllFollowing(int userId);
    List<User> GetFollowersAsUsers(int userId);
    List<User> GetFollowingAsUsers(int userId);
    bool IsFollowing(int userId, int id2);


    //Favorites Methods //
    void FavoriteMovie(int movieId, int userId);
    List<Movie> GetFavoriteMovies(int userId);
    Show FavoriteShow(int showId, int userId);
    Task<bool> IsFavoritedMovie(int userId, int movieId);
    Task<bool> IsFavoritedShow(int userId, int showId);
    List<Show> GetFavoriteShows(int userId);
    bool DeleteFavoriteMovieById(int userId, int mediaId);
    bool DeleteFavoriteShowById(int userId, int mediaId);
    
  }
}

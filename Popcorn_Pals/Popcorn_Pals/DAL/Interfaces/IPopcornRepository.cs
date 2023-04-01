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
    User? GetUser(string userName);
    User AddUser(string userName, string password);
    User GetUserById(int id);
    bool UpdateUser(User userToUpdate);
    List<User> SearchUserByName(string userToSearch);


    // Review Methods //

    UserReview AddMovieReview(UserReview reviewToAdd);
    UserReview AddShowReview(UserReview reviewToAdd);
    List<UserReview> GetAllReviews();
    List<UserReview> GetReviewsByUserId(int userId);
    List<UserReview> GetReviewByReviewId(int id);
    //UserReview DeleteMovieReview(UserReview reviewToDelete);
    //UserReview EditMovieReview(UserReview reviewToEdit);
    //UserReview DeleteShowReview(UserReview reviewToDelete);
    //UserReview EditShowReview(UserReview reviewToEdit);
    //UserReview DeleteMovieReview(UserReview reviewToDelete);
    //UserReview EditMovieReview(UserReview reviewToEdit);
    //UserReview DeleteShowReview(UserReview reviewToDelete);
    //UserReview EditShowReview(UserReview reviewToEdit);
    //UserReview GetReviewByMediaId(int mediaId);
    //UserReview GetMediaTypeById(int userId, int mediaId);
    //List<UserReview> GetReviewByMovieId(int movieId);
    //List<UserReview> GetReviewByShowId(int showId);
    //bool IsReviewedByUser(int userId, int mediaId, int showId)


 // Follow Methods //
    Follow FollowUser(int user, int profile);
    Follow UnfollowUser(int user, int profile);
    List<Follow> GetAllFollowers(int userId);
    List<Follow> GetAllFollowing(int userId);
    bool IsFollowing(int userId, int id2);


    //Favorites Methods //
    void FavoriteMovie(int movieId, int userId);
    List<Movie> GetFavoriteMovies(int userId);
    Show FavoriteShow(int showId, int userId);
    List<Show> GetFavoriteShows(int userId);
    bool DeleteFavoriteMovieById(int userId, int mediaId);
    bool DeleteFavoriteShowById(int userId, int mediaId);
  }
}

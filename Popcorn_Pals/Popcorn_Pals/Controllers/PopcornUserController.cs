using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Popcorn_Pals.Models;
using Popcorn_Pals.DAL;
using System;

namespace Popcorn_Pals.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PopcornUserController : ControllerBase
  {
    PopcornRepository _popRepo = new PopcornRepository();
    [HttpPost("createUser")]
    public User CreateUser(string userName, string password)
    {
      return _popRepo.AddUser(userName, password);
    }

    [HttpGet]
    public List<User> Get()
    {
      return _popRepo.GetUsers();
    }

    [HttpGet("Login")]
    public User Login(string userName, string password)
    {
      User user = _popRepo.GetUser(userName);
      if (user == null || user.Password != password)
      {
        return null;
      }
      return user;
    }

    [HttpPost("AddMovieReview")]
    public UserReview AddMovieReview(int userId, int mediaId, string review, int rating)
    {
      return _popRepo.AddMovieReview(userId, mediaId, review, rating);
    }

    [HttpPost("AddShowReview")]
    public UserReview AddShowReview(int userId, int mediaId, string review, int rating)
    {
      return _popRepo.AddShowReview(userId, mediaId, review, rating);
    }

    [HttpPost("FollowUser")]
    public Follow FollowUser(int userId, int userToFollow)
    {
      return _popRepo.FollowUser(userId, userToFollow);
    }

    [HttpPost("GetFollowers")]
    public List<Follow> GetFollowers(int userId)
    {
      return _popRepo.GetFollowers(userId);
    }

    [HttpPost("GetFollowing")]
    public List<Follow> GetFollowing(int userId)
    {
      return _popRepo.GetFollowing(userId);
    }

    [HttpPost("GetMediaReview")]
    public List<UserReview> GetMediaReview(int mediaId)
    {
      return _popRepo.GetMediaReview(mediaId);
    }

    [HttpGet("GetFavoriteMovies/{userId}")]
    public IEnumerable<Movie> GetUserFavoriteMovies(int userId)
    {

      return _popRepo.GetFavoriteMovies(userId);
    }

    [HttpGet("GetFavoriteShows/{userId}")]
    public IEnumerable<Show> GetUserFavoriteShows(int userId)
    {

      return _popRepo.GetFavoriteShows(userId);
    }

    [HttpPost("FavoriteMovie/{movieId}/{userId}")]

    public Movie FavoriteMovie(int movieId, int userId)
    {
      return _popRepo.FavoriteMovie(movieId, userId);
    }
    [HttpPost("DeleteFavoriteMovie/{userId}/{movieId}")]
    public bool DeleteFavoriteMovie(int userId, int movieId)
    {
      return _popRepo.DeleteFavoriteMovieById(userId, movieId);
    }

    [HttpPost("DeleteFavoriteShow/{userId}/{showId}")]
    public bool DeleteFavoriteShow(int userId, int showId)
    {
      return _popRepo.DeleteFavoriteShowById(userId, showId);
    }


    [HttpPost("FavoriteShow/{showId}/{userId}")]

    public Show FavoriteShow(int showId, int userId)
    {
      return _popRepo.FavoriteShow(showId, userId);
    }


  }
}

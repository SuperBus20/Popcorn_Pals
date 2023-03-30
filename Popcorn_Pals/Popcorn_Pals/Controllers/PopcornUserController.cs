using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Popcorn_Pals.Models;
using Popcorn_Pals.DAL;
using System;
using Popcorn_Pals.Services.Interfaces;
using Popcorn_Pals.DAL.Interfaces;

namespace Popcorn_Pals.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PopcornUserController : ControllerBase
  {
    private readonly IPopcornService _popcornService; //wrapping this instance in a private field, injection is happening in constructor
    private readonly IPopcornRepository _popcornRepository;


    public PopcornUserController(IPopcornService popcornService, IPopcornRepository popcornRepository) //constructor for dependency injection
    {
      _popcornService = popcornService;
      _popcornRepository = popcornRepository;
    }
    //assigning _service and _repo to an instance of the type that I want

    // User Endpoints
    [HttpPost("CreateUser")]
    public User CreateUser(string userName, string password)
    {
      return _popcornRepository.AddUser(userName, password);
    }

    [HttpGet]
    public List<User> Get()
    {
      return _popcornRepository.GetUsers();
    }

    [HttpGet("Login")]
    public User Login(string userName, string password)
    {
      User user = _popcornRepository.GetUser(userName);
      if (user == null || user.Password != password)
      {
        return null;
      }
      return user;
    }



    // Review Endpoints

    [HttpPost("AddMovieReview")]
    public UserReview AddMovieReview(int userId, int mediaId, string review, int rating)
    {
      return _popcornService.AddMovieReview(userId, mediaId, review, rating);
    }

    [HttpPost("AddShowReview")]
    public UserReview AddShowReview(int userId, int mediaId, string review, int rating)
    {
      return _popcornService.AddShowReview(userId, mediaId, review, rating);
    }

    [HttpPost("GetReviewByMediaId")]
    public List<UserReview> GetReviewByMediaId(int mediaId)
    {
      return _popcornRepository.GetReviewByMediaId(mediaId);
    }

    [HttpPost("GetReviewByUserId")]
    public List<UserReview> GetReviewByUserId(int userId)
    {
      return _popcornRepository.GetReviewByUserId(userId);
    }

    [HttpPost("GetReviewByReviewId")]
    public List<UserReview> GetReviewByReviewId(int reviewId)
    {
      return _popcornRepository.GetReviewByReviewId(reviewId);
    }

    // TODO: Add Edit Review



    // Follow Endpoints

    [HttpPost("FollowUser")]
    public Follow FollowUser(int userId, int userToFollow)
    {
      return _popcornRepository.FollowUser(userId, userToFollow);
    }

    [HttpPost("UnfollowUser")]
    public Follow UnfollowUser(int userId, int userToUnfollow)
    {
      return _popcornRepository.UnfollowUser (userId, userToUnfollow);
    }

    [HttpPost("GetFollowers")]
    public List<Follow> GetFollowers(int userId)
    {
      return _popcornRepository.GetAllFollowers(userId);
    }

    [HttpPost("GetFollowing")]
    public List<Follow> GetFollowing(int userId)
    {
      return _popcornRepository.GetAllFollowing(userId);
    }

    [HttpPost("IsFollowing")]
    public bool IsFollowing(int userId, int id)
    {
      return _popcornRepository.IsFollowing(userId, id);
    }



    // Favorites

    [HttpGet("GetFavoriteMovies/{userId}")]
    public IEnumerable<Movie> GetUserFavoriteMovies(int userId)
    {

      return _popcornRepository.GetFavoriteMovies(userId);
    }

    [HttpGet("GetFavoriteShows/{userId}")]
    public IEnumerable<Show> GetUserFavoriteShows(int userId)
    {

      return _popcornRepository.GetFavoriteShows(userId);
    }

    [HttpPost("FavoriteMovie")]
    //had to change from movie type to void due to 429 error
    public void FavoriteMovie(int movieId, int userId)
    {
      // return
      _popcornRepository.FavoriteMovie(movieId, userId);
    }
    [HttpPost("DeleteFavoriteMovie/{userId}/{movieId}")]
    public bool DeleteFavoriteMovie(int userId, int movieId)
    {
      return _popcornRepository.DeleteFavoriteMovieById(userId, movieId);
    }

    [HttpPost("DeleteFavoriteShow/{userId}/{showId}")]
    public bool DeleteFavoriteShow(int userId, int showId)
    {
      return _popcornRepository.DeleteFavoriteShowById(userId, showId);
    }

    [HttpPost("FavoriteShow/{showId}/{userId}")]
    public Show FavoriteShow(int showId, int userId)
    {
      return _popcornRepository.FavoriteShow(showId, userId);
    }
    
  }
}

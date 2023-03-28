using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Popcorn_Pals.Models;
using Popcorn_Pals.DAL;
using System;
using Popcorn_Pals.Services.Interfaces;
using Popcorn_Pals.DAL.Interfaces;
using System.Net;

namespace Popcorn_Pals.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PopcornUserController : ControllerBase
  {
    private readonly IPopcornService _popcornService;
    private readonly IPopcornRepository _popcornRepository;

    public PopcornUserController(IPopcornService popcornService, IPopcornRepository popcornRepository)
    {
      _popcornService = popcornService;
      _popcornRepository = popcornRepository;
    }

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

    [HttpPost("UpdateUser")]
    public HttpResponseMessage UpdateUser(int UserId, string newUserName, string newPassword, int newUserRating, string newUserPic, string newUserBio)
    {
      User userToUpdate = new User
      {
        UserId = UserId,
        UserName = newUserName,
        Password = newPassword,
        UserRating = newUserRating,
        UserPic = newUserPic,
        UserBio = newUserBio
      };


      try
      {
        if (_popcornRepository.UpdateUser(userToUpdate))
        {
          return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
        else
        {
          return new HttpResponseMessage(HttpStatusCode.NotFound);
        }
      }
      catch (Exception)
      {
        return new HttpResponseMessage(HttpStatusCode.ServiceUnavailable);
      }
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
      // TODO: Need to add logic to make sure user is not already following another user - Non-MVP
    }

    [HttpPost("GetFollowers")]
    public List<Follow> GetFollowers(int userId)
    {
      return _popcornRepository.GetFollowers(userId);
    }

    [HttpPost("GetFollowing")]
    public List<Follow> GetFollowing(int userId)
    {
      return _popcornRepository.GetFollowing(userId);
    }

  }
}

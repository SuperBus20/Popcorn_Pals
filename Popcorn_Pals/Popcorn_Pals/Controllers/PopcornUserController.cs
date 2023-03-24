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

<<<<<<< HEAD
=======
    [HttpGet]
    public List<User> Get()
    {
      return _popRepo.GetUsers();
    }
>>>>>>> 0359a16609a61fd508feb9d6e17dc01ebb441f36
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

    [HttpPost("GetMediaReview")]
    public List <UserReview> GetMediaReview(int mediaId)
    {
      return _popRepo.GetMediaReview(mediaId);
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


  }
}

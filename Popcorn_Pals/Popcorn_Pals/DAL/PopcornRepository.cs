using Popcorn_Pals.Models;
using Popcorn_Pals.DAL.Interfaces;
using Popcorn_Pals.Controllers;
using System;

namespace Popcorn_Pals.DAL
{
  public class PopcornRepository : IPopcornRepository
  {
    private PopcornContext _popContext = new PopcornContext();


// User Methods //
    public List<User> GetUsers()
    {
      return _popContext.Users.ToList();
    }

    public User GetUser(string userName)
    {
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
      User user = GetUsers()
        .FirstOrDefault(x => x.UserName
        .ToLower()
        .Trim() == userName
        .ToLower()
        .Trim());
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
      if (user == null)
      {
        return null;
      }
      return user;
    }

    public User AddUser(string userName, string password)
    {
      User toAdd = GetUser(userName);
      if (toAdd != null)
      {
        return null;
      }
      _popContext.Users.Add(new User()
      {
        UserName = userName,
        Password = password
      });
      _popContext.SaveChanges();
      return GetUser(userName);
    }

#pragma warning disable CS8600
    public User GetUserById(int id)
    {
      User user = GetUsers()
        .FirstOrDefault(x => x.UserId == id);
      if (user == null)
      {
        return null;
      }
      return user;
    }
#pragma warning restore CS8600



// Review Methods //
    public UserReview AddMovieReview(UserReview reviewToAdd)
    {
      _popContext.Reviews.Add(reviewToAdd);
      _popContext.SaveChanges();
      return reviewToAdd;
    }

    public UserReview AddShowReview(UserReview reviewToAdd)
    {
      _popContext.Reviews.Add(reviewToAdd);
      _popContext.SaveChanges();
      return reviewToAdd;
    }

    // public UserReview EditReview(int userId, int Id, string review, int rating) // Non-MVP
    // {
    //   Goal of method: Pass in Id of Review to be edited and save changes 
    //   UserReview reviewEdit = 


    //   _popContext.Reviews.Add(reviewToEdit);
    //   _popContext.SaveChanges();
    //   return reviewToEdit;
    // }

    public List<UserReview> GetReviewByMediaId(int mediaId)
    {
      List<UserReview> Reviews = _popContext.Reviews
        .Where(x => x.MediaId == mediaId)
        .ToList();
      return Reviews;
    }

    public List<UserReview> GetReviewByUserId(int userId)
    {
      List<UserReview> Reviews = _popContext.Reviews
        .Where(x => x.UserId == userId)
        .ToList();
      return Reviews;
    }

    public List<UserReview> GetReviewByReviewId(int id) //updated
    {
      List<UserReview> Reviews = _popContext.Reviews
        .Where(x => x.Id == id)
        .ToList();
      return Reviews;
    }



// Follow Methods //
    public Follow FollowUser(int user, int userToFollow) // Working as of last change to method
    {
      Follow follow = new Follow
      {
        UserId = user,
        FollowingId = userToFollow
      };

      Follow follow2 = new Follow
      {
        FollowerId = user,
        UserId = userToFollow
      };

      _popContext.Follows.Add(follow);
      _popContext.Follows.Add(follow2);
      _popContext.SaveChanges();

      return follow;
    }

    // public Follow Follow/UnfollowUser(int user, int userToFollow) //!!Untested - attempt to remove follow - Non-MVP
    // {
    //   Follow follow = _popContext.Follows.FirstOrDefault(x => x.UserId == user && x.UserId == userToFollow);

    //   if (follow != null)
    //   {
    //     _popContext.Follows.Remove(follow);
    //     _popContext.SaveChanges();
    //     return follow;
    //   }
    //   else
    //   {
    //     follow = new Follow
    //     {
    //       UserId = user,
    //       FollowingId = userToFollow
    //     };

    //     Follow follow2 = new Follow
    //     {
    //       FollowerId = user,
    //       UserId = userToFollow
    //     };

    //     _popContext.Follows.Add(follow);
    //     _popContext.Follows.Add(follow2);
    //     _popContext.SaveChanges();
    //     return follow;
    //   }
    // }

    public List<Follow> GetFollowers(int userId)
    {
      List<Follow> Followers = _popContext.Follows
        .Where(x => x.UserId == userId)
        .Where(x => x.FollowerId != null)
        .ToList();
      return Followers;
    }

    public List<Follow> GetFollowing(int userId)
    {
      List<Follow> Followers = _popContext.Follows
        .Where(x => x.UserId == userId)
        .Where(x => x.FollowingId != null)
        .ToList();
      return Followers;
    }



  }
}

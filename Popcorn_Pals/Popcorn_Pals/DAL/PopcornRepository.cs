using Popcorn_Pals.Models;
using Popcorn_Pals.DAL;
using Popcorn_Pals.Controllers;
using Microsoft.EntityFrameworkCore;

namespace Popcorn_Pals.DAL
{
  public class PopcornRepository
  {
    private PopcornController _controller = new PopcornController();
    private PopcornContext _popContext = new PopcornContext();

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

    public bool UpdateUser(User userToUpdate)
    {
      if (GetUserById(userToUpdate.UserId) == null)
      {
        return false;
      }

      _popContext.Users.Update(userToUpdate);
      _popContext.SaveChanges();
      return true;
    }

    public UserReview AddMovieReview(int userId, int mediaId, string review, int rating)
    {
      User newUser = GetUserById(userId);
      Movie newMovie = _controller.GetMovieById(mediaId).FirstOrDefault(x => x._id == mediaId);
      UserReview reviewToAdd = new UserReview()
      {
        UserId = newUser.UserId,
        Movie = newMovie,
        MediaId = newMovie._id,
        Review = review,
        Rating = rating
      };

      _popContext.Reviews.Add(reviewToAdd);
      _popContext.SaveChanges();
      return reviewToAdd;


    }

    public UserReview AddShowReview(int userId, int mediaId, string review, int rating)
    {
      User newUser = GetUserById(userId);
      Show newShow = _controller.GetShowById(mediaId).FirstOrDefault(x => x._id == mediaId);
      UserReview reviewToAdd = new UserReview()
      {
        UserId = newUser.UserId,
        MediaId = newShow._id,
        Show = newShow,
        Review = review,
        Rating = rating
      };

      _popContext.Reviews.Add(reviewToAdd);
      _popContext.SaveChanges();
      return reviewToAdd;


    }

    public Follow FollowUser(int user, int userToFollow)
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

    public User GetUserById(int id)
    {
      return _popContext.Users.AsNoTracking().FirstOrDefault(x => x.UserId == id);
    }

  }
}

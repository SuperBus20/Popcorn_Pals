using Popcorn_Pals.Models;
using Popcorn_Pals.DAL.Interfaces;
using Popcorn_Pals.Controllers;
using Popcorn_Pals.Services;
using System;
using Flurl.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
      return _popContext.Users.AsNoTracking().FirstOrDefault(x => x.UserId == id);
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


    //   _popContext.Reviews.Update(reviewToEdit);
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
    public List<Follow> GetAllFollowers(int userId)
    {
      Console.WriteLine($"Getting followers for user {userId}");
      List<Follow> Followers = _popContext.Follows
        .Where(x => x.UserId == userId)
        .Where(x => x.FollowerId != null)
        .ToList();
      Console.WriteLine($"Found {Followers.Count} followers");
      return Followers;
    }

    public List<Follow> GetAllFollowing(int userId)
    {
      List<Follow> Followers = _popContext.Follows
        .Where(x => x.UserId == userId)
        .Where(x => x.FollowingId != null)
        .ToList();
      return Followers;
    }

    public List<User> GetFollowersAsUsers(int userId)
    {
      List<User> usersToReturn = new List<User>();
      var followerIds = GetAllFollowers(userId).ToList();
      foreach (var follower in followerIds)
      {
        usersToReturn.Add(GetUserById((int)follower.FollowerId));
      }
      return usersToReturn;
    }

    public List<User> GetFollowingAsUsers(int userId)
    {
      List<User> usersToReturn = new List<User>();
      var followingIds = GetAllFollowing(userId).ToList();
      foreach (var following in followingIds)
      {
        usersToReturn.Add(GetUserById((int)following.FollowingId));
      }
      return usersToReturn;
    }

    public bool IsFollowing(int userId, int id2)
    {
      List<Follow> test = GetAllFollowing(userId)
        .Where(x => x.UserId == userId && x.FollowingId == id2).ToList();

      return test.Count > 0; // >0 = true/Is Following
    }

    public Follow FollowUser(int user, int profile)
    {
      bool checkForFollow = IsFollowing(user, profile);
      if (checkForFollow == false)
      {
        Follow follow = new Follow
        {
          UserId = user,
          FollowingId = profile
        };

        Follow follow2 = new Follow
        {
          FollowerId = user,
          UserId = profile
        };

        _popContext.Follows.Add(follow);
        _popContext.Follows.Add(follow2);
        _popContext.SaveChanges();

        return follow;
      }
      else
      {
        throw new ArgumentException("User is being followed");
      }
    }

    public Follow UnfollowUser(int user, int profile)
    {
      bool checkForFollow = IsFollowing(user, profile);
      if (checkForFollow == true)
      {
        var relationship = _popContext.Follows.Where(x => x.UserId == user && x.FollowingId == profile).First();
        var relationship2 = _popContext.Follows.Where(x => x.UserId == profile && x.FollowerId == user).First();

        _popContext.Follows.Remove(relationship);
        _popContext.Follows.Remove(relationship2);

        _popContext.SaveChanges();

        return relationship;
      }
      else
      {
        throw new ArgumentException("User is not being followed");
      }
    }


    //TODO revisit this soon
    //had to change from movie type to void due to 429 error
    public void FavoriteMovie(int movieId, int userId)
    {
      //Movie movie = GetMovie(movieId) ;

      User user = GetUserById(userId);
      Favorite favorite = new Favorite()
      {
        MovieId = movieId, //movie._id,
        UserId = user.UserId
      };
      if (user != null && movieId != null)
      {
        _popContext.Favorites.Add(favorite);
        _popContext.SaveChanges();
        //return movie;
      }
      // return null;
    }

    ///// for some reason this is the only way i was able to get show all favorite movies to work will fix after MVP
    public static List<Movie> GetMovieById(int _id)
    {
      string apiUri = $"https://streamlinewatch-streaming-guide.p.rapidapi.com/movies/{_id}?platform=web";
      var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",
        x_rapidapi_key = "1e4df72b94msh67f918ddd6353ebp1260b8jsnc28b865c6b58"


      }).GetJsonAsync<List<Movie>>();
      apiTask.Wait();
      List<Movie> movie = apiTask.Result;
      return movie;
    }

    public static Movie GetMovie(int movieId)// this method converts Movie from list to movie object to be used in get favorite movies
    {
      Movie movie = GetMovieById(movieId).FirstOrDefault(x => x._id == movieId);
      return movie;
    }

    public List<Movie> GetFavoriteMovies(int userId)
    {
      List<Movie> favorites = _popContext.Favorites
        .Where(x => x.UserId == userId)
        .Select(x => GetMovie(x.MovieId ?? 0))
        .ToList();
      if (favorites == null)
      {
        return null;
      }
      return favorites;
    }
    // see note above GetMovieById

    public Show FavoriteShow(int showId, int userId)
    {
      Show show = GetShowById(showId).FirstOrDefault(x => x._id == showId); ;
      User user = GetUserById(userId);
      Favorite favorite = new Favorite()
      {
        ShowId = show._id,
        UserId = user.UserId
      };
      if (user != null && show != null)
      {
        _popContext.Favorites.Add(favorite);
        _popContext.SaveChanges();
        return show;
      }
      return null;
    }

    //TODO revisit this soon
    ///// for some reason this is the only way i was able to get show all favorite movies to work will fix after MVP
    public static List<Show> GetShowById(int _id)
    {
      string apiUri = $"https://streamlinewatch-streaming-guide.p.rapidapi.com/shows/{_id}?platform=web";
      var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",

        x_rapidapi_key = "1e4df72b94msh67f918ddd6353ebp1260b8jsnc28b865c6b58"

      }).GetJsonAsync<List<Show>>();
      apiTask.Wait();
      List<Show> show = apiTask.Result;
      return (show);
    }

    public static Show GetShow(int showId)// this method converts Movie from list to movie object to be used in get favorite movies
    {
      Show show = GetShowById(showId).FirstOrDefault(x => x._id == showId);
      return show;
    }
    // see note above GetShowById

    public List<Show> GetFavoriteShows(int userId)
    {
      List<Show> favorites = _popContext.Favorites
        .Where(x => x.UserId == userId)
        .Select(x => GetShow(x.ShowId ?? 0))
        .ToList();
      if (favorites == null)
      {
        return null;
      }
      return favorites;
    }
    public async Task<bool> IsFavoritedMovie(int userId, int movieId)
    {
      // check if item is favorited for user in database
      var favorite = await _popContext.Favorites
          .SingleOrDefaultAsync(x => x.UserId == userId && x.MovieId == movieId);

      return favorite != null;
    }
    public async Task<bool> IsFavoritedShow(int userId, int showId)
    {
      // check if item is favorited for user in database
      var favorite = await _popContext.Favorites
          .SingleOrDefaultAsync(x => x.UserId == userId && x.ShowId == showId);

      return favorite != null;
    }

    public bool DeleteFavoriteMovieById(int userId, int mediaId)
    {
      Favorite favorite = _popContext.Favorites
        .Where(x => x.UserId == userId)
        .FirstOrDefault(x => x.MovieId == mediaId);

      if (favorite == null)
      {
        return false;
      }
      _popContext.Favorites.Remove(favorite);
      _popContext.SaveChanges();

      return true;
    }

    public bool DeleteFavoriteShowById(int userId, int mediaId)
    {
      Favorite favorite = _popContext.Favorites
        .Where(x => x.UserId == userId)
        .FirstOrDefault(x => x.ShowId == mediaId);

      if (favorite == null)
      {
        return false;
      }
      _popContext.Favorites.Remove(favorite);
      _popContext.SaveChanges();

      return true;
    }

    public List<User> SearchUserByName(string userToSearch)
    {
      List<User> users = _popContext.Users
        .Where(x => x.UserName.ToLower().Contains(userToSearch.ToLower())).ToList();
      return users;
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



  }
}

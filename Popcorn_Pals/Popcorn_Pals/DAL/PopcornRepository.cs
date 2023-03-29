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
        x_rapidapi_key = "4c13f6f778msh119473f4e6fc2f0p1dd729jsne6e01423ff10"

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
        .Select(x => GetMovie((int)x.MovieId))
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

        x_rapidapi_key = "4c13f6f778msh119473f4e6fc2f0p1dd729jsne6e01423ff10"

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
        .Select(x => GetShow((int)x.ShowId))
        .ToList();
      if (favorites == null)
      {
        return null;
      }
      return favorites;
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

  }
}

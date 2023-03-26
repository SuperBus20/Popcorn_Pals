using Popcorn_Pals.Models;
using Popcorn_Pals.DAL;
using Popcorn_Pals.Controllers;
using System;
using Flurl.Http;

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

    public Movie FavoriteMovie(int movieId, int userId)
    {
      Movie movie = GetMovie(movieId) ;
      User user = GetUserById(userId);
      Favorite favorite = new Favorite()
      {
        MovieId = movie._id,
        UserId = user.UserId
      };
      if (user != null && movie != null)
      {
        _popContext.Favorites.Add(favorite);
        _popContext.SaveChanges();
        return movie;
      }
      return null;
    }




    ///// for some reason this is the only way i was able to get show all favorite movies to work will fix after MVP
    public static List<Movie> GetMovieById(int _id)
    {
      string apiUri = $"https://streamlinewatch-streaming-guide.p.rapidapi.com/movies/{_id}?platform=web";
      var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",
        x_rapidapi_key = "a65344b23bmsha856fb6240b15a7p1d2d1fjsnfa7c96c9d518"

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
      Show show = _controller.GetShowById(showId).FirstOrDefault(x => x._id == showId); ;
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


    ///// for some reason this is the only way i was able to get show all favorite movies to work will fix after MVP
    public static List<Show> GetShowById(int _id)
    {
      string apiUri = $"https://streamlinewatch-streaming-guide.p.rapidapi.com/shows/{_id}?platform=web";
      var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",

        x_rapidapi_key = "a65344b23bmsha856fb6240b15a7p1d2d1fjsnfa7c96c9d518"

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

    public List<UserReview> GetMediaReview(int mediaId)
    {
      _popContext.Reviews.ToList();

      List<UserReview> Reviews = _popContext.Reviews
        .Where(x => x.MediaId == mediaId)
        .ToList();
      return Reviews;
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
  }
}

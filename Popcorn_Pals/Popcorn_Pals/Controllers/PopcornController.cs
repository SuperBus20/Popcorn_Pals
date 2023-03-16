using Flurl.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Popcorn_Pals.Models;
using System.Drawing.Text;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Popcorn_Pals.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PopcornController : ControllerBase
  {
    string juneKey = "4fc1bbfbfamsh918f184e4f2d29cp13265ajsnad0c24e96d2b";
    string anhKey = "75b89c1e52msh391d45bf48da45bp1a0f89jsnf24f7bad2b61";
    string lisaKey = "15728bb747mshb12d9318d06a090p16bcc7jsnf46cf1933827";
    [HttpGet("search")]
    public List<Search> SearchByTitle(string title, string type)
    {
      string apiUri = $"https://streamlinewatch-streaming-guide.p.rapidapi.com/search?type={type}&query={title}";
      var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",
        x_rapidapi_key = juneKey

      }).GetJsonAsync<List<Search>>();
      apiTask.Wait();
      List<Search> searches = apiTask.Result;
      foreach (var search in searches)
      {
        search.type = type;
      }
      return (searches);

    }


    [HttpGet("movie")]
    public List<Movie> GetMovieById(int _id)
    {
      string apiUri = $"https://streamlinewatch-streaming-guide.p.rapidapi.com/movies/{_id}?platform=web";
      var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",
        x_rapidapi_key = juneKey

      }).GetJsonAsync<List<Movie>>();
      apiTask.Wait();
      List<Movie> movie = apiTask.Result;
      return (movie);
    }

    [HttpGet("show")]
    public List<Show> GetShowById(int _id)
    {
      string apiUri = $"https://streamlinewatch-streaming-guide.p.rapidapi.com/shows/{_id}?platform=web";
      var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",

        x_rapidapi_key = juneKey

      }).GetJsonAsync<List<Show>>();
      apiTask.Wait();
      List<Show> show = apiTask.Result;
      return (show);
    }

  }
}

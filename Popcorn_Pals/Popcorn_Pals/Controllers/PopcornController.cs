using Flurl.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Popcorn_Pals.Configs;
using Popcorn_Pals.Models;
using System.Drawing.Text;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

// external api call mgmt
namespace Popcorn_Pals.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PopcornController : ControllerBase
  {

    private readonly UrlConfig _config;

    public PopcornController(UrlConfig config) //constructor injection to take in config inst.
    {
      _config = config;
    }

    [HttpGet("search")]
    public List<Search> SearchByTitle(string title, string type)
    {
      string apiUri = $"{_config.RapidApi}/search?type={type}&query={title}";
       var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",
        x_rapidapi_key = _config.RapidApiKey

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
      string apiUri = $"{_config.RapidApi}/movies/{_id}?platform=web";
      var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",
        x_rapidapi_key =_config.RapidApiKey

      }).GetJsonAsync<List<Movie>>();
      apiTask.Wait();
      List<Movie> movie = apiTask.Result;
      return (movie);
    }

    [HttpGet("show")]
    public List<Show> GetShowById(int _id)
    {
      string apiUri = $"{_config.RapidApi}/shows/{_id}?platform=web";
      var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",

        x_rapidapi_key = _config.RapidApiKey

      }).GetJsonAsync<List<Show>>();
      apiTask.Wait();
      List<Show> show = apiTask.Result;
      return (show);
    }
  }
}

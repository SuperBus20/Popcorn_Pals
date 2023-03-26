using Flurl.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Popcorn_Pals.Configs;
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
    string anhKey2 = "b2f985562amsh9ea369258704508p17e603jsnc19236cf310d";
    string lisaKey = "15728bb747mshb12d9318d06a090p16bcc7jsnf46cf1933827";
    string ninaKey = "c3c31804a0msh549c51f669d98abp177bbcjsn8d40f5869cfb";
    string steveKey = "90c699cf65mshec3ae4f525bb8c4p1cd9dbjsnd287dbed514c";
    private readonly UrlConfig _config;

    public PopcornController(UrlConfig config)
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
        x_rapidapi_key = steveKey

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
        x_rapidapi_key = steveKey

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

        x_rapidapi_key = steveKey

      }).GetJsonAsync<List<Show>>();
      apiTask.Wait();
      List<Show> show = apiTask.Result;
      return (show);
    }
  }
}

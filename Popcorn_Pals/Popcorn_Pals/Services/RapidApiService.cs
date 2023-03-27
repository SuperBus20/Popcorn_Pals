using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Flurl.Http;
using Popcorn_Pals.Configs;
using Popcorn_Pals.Models;
using Popcorn_Pals.Services.Interfaces;
using Popcorn_Pals.Controllers;

namespace Popcorn_Pals.Services
{
  public class RapidApiService : IRapidApiService
  {
    private readonly UrlConfig _config;
    public RapidApiService(UrlConfig config)
    {
      _config = config;
    }

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

    public List<Movie> GetMovieById(int _id)
    {
      string apiUri = $"{_config.RapidApi}/movies/{_id}?platform=web";
      var apiTask = apiUri.WithHeaders(new
      {
        x_rapidapi_host = "streamlinewatch-streaming-guide.p.rapidapi.com",
        x_rapidapi_key = _config.RapidApiKey

      }).GetJsonAsync<List<Movie>>();
      apiTask.Wait();
      List<Movie> movie = apiTask.Result;
      return (movie);
    }
  }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Popcorn_Pals.Models;
using Popcorn_Pals.Services.Interfaces;

namespace Popcorn_Pals.Services
{
  public class RapidApiService : IRapidApiService
  {
    public List<Show> GetShowById(int _id)
    {
      throw new NotImplementedException();
    }

    public List<Movie> GetMovieById(int _id)
    {
        throw new NotImplementedException();
    }
  }
}
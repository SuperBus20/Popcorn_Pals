using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Popcorn_Pals.Models;

namespace Popcorn_Pals.Services.Interfaces
{
    public interface IRapidApiService
    {
        List<Show> GetShowById(int _id);
        List<Movie> GetMovieById(int _id);
    }
}
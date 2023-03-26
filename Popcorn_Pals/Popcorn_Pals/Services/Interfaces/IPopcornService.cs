using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Popcorn_Pals.Models;

namespace Popcorn_Pals.Services.Interfaces
{
    public interface IPopcornService
    {
        UserReview AddShowReview(int userId, int mediaId, string review, int rating);
        UserReview AddMovieReview(int userId, int mediaId, string review, int rating);
    }
}
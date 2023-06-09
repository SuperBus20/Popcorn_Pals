using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Popcorn_Pals.DAL.Interfaces;
using Popcorn_Pals.Models;
using Popcorn_Pals.Services.Interfaces;

namespace Popcorn_Pals.Services
{
  public class PopcornService : IPopcornService
  {
    private readonly IRapidApiService _rapidApiService;
    private readonly IPopcornRepository _popcornRepository;

    public PopcornService(IRapidApiService rapidApiService, IPopcornRepository popcornRepository)
    {
        _rapidApiService = rapidApiService;
        _popcornRepository = popcornRepository;
    }

    public UserReview AddMovieReview(int userId, int mediaId, string review, int rating)
    {
      Movie movieToReview = _rapidApiService.GetMovieById(mediaId).FirstOrDefault(x => x._id == mediaId);
      UserReview reviewToAdd = new UserReview()
      {
        UserId = userId,
        MediaId = movieToReview._id,
        Movie = movieToReview,
        Review = review,
        Rating = rating
      };
      
      return _popcornRepository.AddMovieReview(reviewToAdd);
    }

    public UserReview AddShowReview(int userId, int mediaId, string review, int rating)
    {
      Show showToReview = _rapidApiService.GetShowById(mediaId).FirstOrDefault(x => x._id == mediaId);
      UserReview reviewToAdd = new UserReview()
      {
        UserId = userId,
        MediaId = showToReview._id,
        Show = showToReview,
        Review = review,
        Rating = rating
      };

      _popcornRepository.AddShowReview(reviewToAdd);
      return reviewToAdd;
    }
  }
}
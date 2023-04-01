namespace Popcorn_Pals.Models
{
  public class UserReview
  {
    public int Id { get; set; } //Id for review aka reviewId
    public int UserId { get; set; }
    public virtual User? User { get; set; }
    public int MediaId { get; set; }
    public bool isMovieReview { get; set; }
    public bool isShowReview { get; set; }
    public virtual Movie? Movie { get; set; }
    public virtual Show? Show { get; set; }
    public string? Review { get; set; }
    public int Rating { get; set; }

    // public static implicit operator UserReview(UserReview v)
    // {
    //   throw new NotImplementedException();
    // }
  }
}

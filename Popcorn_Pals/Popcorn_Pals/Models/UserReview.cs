namespace Popcorn_Pals.Models
{
  public class UserReview
  {
    internal int MovieId;

    public int Id { get; set; } //Id for review aka reviewId
    public int UserId { get; set; }
    public virtual User? User { get; set; }
    public int? MediaId { get; set; } //TODO: get rid of and update database
    public virtual Movie? Movie { get; set; }
    public virtual Show? Show { get; set; }
    public string? Review { get; set; }
    public int Rating { get; set; }
    public int ShowId { get; internal set; }

    // public static implicit operator UserReview(UserReview v)
    // {
    //   throw new NotImplementedException();
    // }
  }
}

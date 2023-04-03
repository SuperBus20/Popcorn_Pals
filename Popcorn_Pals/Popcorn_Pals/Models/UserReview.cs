namespace Popcorn_Pals.Models
{
  public class UserReview
  {

    public int Id { get; set; } //Id for review aka reviewId
    public int UserId { get; set; }
    public virtual User? User { get; set; }
    public int? MediaId { get; set; }
    public virtual Movie? Movies { get; set; }
    public virtual Show? Shows { get; set; }
    public string? Review { get; set; }
    public int Rating { get; set; }

  }
}

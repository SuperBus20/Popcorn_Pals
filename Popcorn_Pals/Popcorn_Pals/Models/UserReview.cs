namespace Popcorn_Pals.Models
{
  public class UserReview
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    public virtual User User { get; set; }
    public int MediaId { get; set; }
    public virtual Movie? Movie { get; set; }
    public virtual Show? Show { get; set; }
    public string Review { get; set; }
    public int Rating { get; set; }
  }
}

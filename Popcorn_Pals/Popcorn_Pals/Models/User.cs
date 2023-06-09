using System.ComponentModel.DataAnnotations;

namespace Popcorn_Pals.Models
{
  public class User
  {
    [Key]
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public int UserRating { get; set; }
    public string? UserPic { get; set; }
    public string? UserBio { get; set; }
    
    // public virtual List<Follow>? Followers { get; set; }
    // public virtual List<Follow>? Following { get; set; }
  }
}

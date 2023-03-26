using System;
namespace Popcorn_Pals.Models
{
  public class Follow
  {
    //Basically ID for follow relationship
    public int Id { get; set; } 

    //You
    public int UserId { get; set; }
    public virtual User user { get; set; }

    // people that are following you
    public int? FollowerId { get; set; }

    // the user you are following
    public int? FollowingId { get; set; }
  }
}

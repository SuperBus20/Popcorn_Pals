using System;
using System.ComponentModel.DataAnnotations;
namespace Popcorn_Pals.Models
{
 
    public class Favorite
    {
      [Key]
      public int Id { get; set; }
      public int UserId { get; set; }

      public virtual User User { get; set; }
      public int? MovieId { get; set; }
      //public virtual Movie Movie { get; set; }
      public int? ShowId { get; set; }
      //public virtual Show Show { get; set; }
  }
  
}


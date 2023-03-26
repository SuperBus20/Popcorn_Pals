using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Popcorn_Pals.Models
{
  public class Show
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int _id { get; set; }
    [DataType("Date")]
    public string first_aired { get; set; }
    public List<string> genres { get; set; }
    public string overview { get; set; }
    public string? poster_path { get; set; }
    public string title { get; set; }
    public string? youtube_trailer { get; set; }
    public List<Source> sources { get; set; }
  }
}

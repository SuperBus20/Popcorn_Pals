namespace Popcorn_Pals.Models
{
  public class Show
  {
    public int _id { get; set; }
    public string first_aired { get; set; }
    public string[] genres { get; set; }
    public string overview { get; set; }
    public string poster_path { get; set; }
    public string title { get; set; }
    public string youtube_trailer { get; set; }
    public Source[] sources { get; set; }
  }
}

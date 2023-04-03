using Microsoft.EntityFrameworkCore;
using Popcorn_Pals.Models;

namespace Popcorn_Pals
{
  public class PopcornContext : DbContext
  {

    public PopcornContext()
    {

    }

    public PopcornContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<User> Users { get; set; }
    public DbSet<UserReview> Reviews { get; set; }
    public DbSet<Follow> Follows { get; set; }
    public DbSet<Favorite> Favorites { get; set; }


    private static IConfigurationRoot _configuration;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

        _configuration = builder.Build();
        string cnstr = _configuration.GetConnectionString("PopcornDb");
        Console.WriteLine($"{cnstr}");
        optionsBuilder.UseSqlServer(cnstr);
      }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Source>().HasNoKey();
      modelBuilder.Entity<Movie>().Ignore(x => x.genres);
      modelBuilder.Entity<Movie>().Ignore(x => x.sources);
      modelBuilder.Entity<Show>().Ignore(x => x.genres);
      modelBuilder.Entity<Show>().Ignore(x => x.sources);
    }
  }
}

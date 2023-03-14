using Microsoft.EntityFrameworkCore;


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
        optionsBuilder.UseSqlServer(cnstr);
      }
    }

  }
}

using Popcorn_Pals.Configs;
using Popcorn_Pals.DAL;
using Popcorn_Pals.DAL.Interfaces;
using Popcorn_Pals.Services;
using Popcorn_Pals.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// var configSection = builder.Configuration.GetSection("ExternalUrls");

// builder.Services.Configure<UrlConfig>(configSection);

var urlConfig = new UrlConfig(); //for rapid api keys in our case
builder.Configuration.Bind("ExternalUrls", urlConfig); //this is what your json is gonna look like as an object
//binds properties from config to fields in external url object in json
// this is databinding through configuration

builder.Services.AddSingleton<UrlConfig>(urlConfig);

builder.Services.AddScoped<IPopcornRepository, PopcornRepository>(); //Anytime someone wants to access PopRepo, check the interface to see if you can
builder.Services.AddScoped<IRapidApiService, RapidApiService>();
builder.Services.AddScoped<IPopcornService, PopcornService>();


builder.Services.AddControllers(); //recognizing controller classes

builder.Services.AddCors(options => //setting up policies for access
{
  options.AddPolicy(name: "CorsPolicy",
      builder =>
      {
        builder.SetIsOriginAllowed(origin => true);
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
        builder.AllowCredentials();
      });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build(); //builds all of the code listed above

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment()) // you can only access swagger if in lower environment (Dev, in this case)
{
  app.UseSwagger();
  app.UseSwaggerUI();
}
app.UseHttpsRedirection(); // ensuring connection is secure, redirects to https is they enter http

app.UseCors("CorsPolicy");

app.UseAuthorization(); //require auth to hit endpoints

app.MapControllers(); // setting up controllers so they can run

app.Run(); //running app

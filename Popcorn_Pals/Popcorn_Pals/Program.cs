using Popcorn_Pals.Configs;
using Popcorn_Pals.DAL;
using Popcorn_Pals.DAL.Interfaces;
using Popcorn_Pals.Services;
using Popcorn_Pals.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

var urlConfig = new UrlConfig(); // Rapid API keys
builder.Configuration.Bind("ExternalUrls", urlConfig); // Binding settings from config to fields in our external url list appsettings.json to classes below
 
builder.Services.AddSingleton<UrlConfig>(urlConfig); // Creating one repo that stays open for the liftime of the app

builder.Services.AddScoped<IPopcornRepository, PopcornRepository>(); // Registering classes as singletons when called via the controller to make globally availiable
builder.Services.AddScoped<IRapidApiService, RapidApiService>();
builder.Services.AddScoped<IPopcornService, PopcornService>();

builder.Services.AddControllers(); // Recognizing the controllers

builder.Services.AddCors(options => // Setting up access policies for the app
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

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build(); // Builds all of the items listed in the above lines of code

//TODO: Configure the HTTP request pipeline.

// Everything below is telling the app to use the things that have been built in above lines of code

if (app.Environment.IsDevelopment()) //Only allowing Swagger to be accessed in dev)
{
  app.UseSwagger();
  app.UseSwaggerUI();
}
app.UseHttpsRedirection(); // Ensuring secure connection

app.UseCors("CorsPolicy"); // Use access policies

app.UseAuthorization(); // To hit endpoints

app.MapControllers(); // Setup these controllers when running

app.Run(); // Run the app

using Popcorn_Pals.Configs;
using Popcorn_Pals.DAL;
using Popcorn_Pals.DAL.Interfaces;
using Popcorn_Pals.Services;
using Popcorn_Pals.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// var configSection = builder.Configuration.GetSection("ExternalUrls");

// builder.Services.Configure<UrlConfig>(configSection);

var urlConfig = new UrlConfig();
builder.Configuration.Bind("ExternalUrls", urlConfig);

builder.Services.AddSingleton<UrlConfig>(urlConfig);

builder.Services.AddScoped<IPopcornRepository, PopcornRepository>();
builder.Services.AddScoped<IRapidApiService, RapidApiService>();
builder.Services.AddScoped<IPopcornService, PopcornService>();


builder.Services.AddControllers();

builder.Services.AddCors(options =>
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

var app = builder.Build();

// Configure the HTTP request pipeline.


app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();

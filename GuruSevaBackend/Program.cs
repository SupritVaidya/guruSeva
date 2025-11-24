// Add this at the top
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using GuruSevaBackend.Models;

// Load .env file
if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production")
{
  Env.Load(".env.production");
}
else
{
  Env.Load();
}

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngular",
    policy => policy
      .AllowAnyOrigin()
      .AllowAnyHeader()
      .AllowAnyMethod()
  );
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Build connection string from environment variables
var dbUser = Environment.GetEnvironmentVariable("DB_USER");
var dbPass = Environment.GetEnvironmentVariable("DB_PASS");
var connectionString = $"Server=db33277.databaseasp.net; Database=db33277; User Id={dbUser}; Password={dbPass}; Encrypt=False; MultipleActiveResultSets=True";

builder.Services.AddDbContext<GuruSevaDbContext>(options =>
    options.UseSqlServer(connectionString)
);



var app = builder.Build();

app.UseCors("AllowAngular");

//if (app.Environment.IsDevelopment())
//{
//  app.UseSwagger();
//  app.UseSwaggerUI();
//}


app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

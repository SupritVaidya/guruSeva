using System;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using GuruSevaBackend.Models;

// Program.cs - entry point for GuruSevaBackend
// This version reads the connection string from configuration (environment variable
// ConnectionStrings__DefaultConnection) and falls back to DB_USER/DB_PASS if needed.

var builder = WebApplication.CreateBuilder(args);

// --- Optional: Load local .env for development only ---
// Make sure .env is listed in .gitignore so secrets are not committed.
if (!string.Equals(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"), "Production", StringComparison.OrdinalIgnoreCase))
{
  try
  {
    Env.Load(); // loads .env from project root (DotNetEnv package required for local dev)
  }
  catch
  {
    // ignore if .env missing or DotNetEnv not available
  }
}

// CORS
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

// Only add Swagger in non-production
if (!string.Equals(builder.Environment.EnvironmentName, "Production", StringComparison.OrdinalIgnoreCase))
{
  builder.Services.AddSwaggerGen();
}

// --- Connection string resolution ---
// 1) Primary: read from configuration (appsettings / env var ConnectionStrings__DefaultConnection)
// 2) Fallback: build from DB_USER/DB_PASS/DB_SERVER/DB_NAME if provided
var configuration = builder.Configuration;
var connectionString = configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
  var server = Environment.GetEnvironmentVariable("DB_SERVER") ?? "db33277.databaseasp.net";
  var db = Environment.GetEnvironmentVariable("DB_NAME") ?? "db33277";
  var user = Environment.GetEnvironmentVariable("DB_USER");
  var pass = Environment.GetEnvironmentVariable("DB_PASS");
  if (!string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(pass))
  {
    connectionString = $"Server={server};Database={db};User Id={user};Password={pass};Encrypt=False;MultipleActiveResultSets=True;";
  }
}

// Fail fast if no connection string found
if (string.IsNullOrWhiteSpace(connectionString))
{
  throw new InvalidOperationException("No database connection string found. Set ConnectionStrings__DefaultConnection or DB_USER/DB_PASS environment variables.");
}

// Register DbContext
builder.Services.AddDbContext<GuruSevaDbContext>(options =>
    options.UseSqlServer(connectionString)
);

var app = builder.Build();

// Use forwarded headers if behind reverse proxy (uncomment if needed)
// using Microsoft.AspNetCore.HttpOverrides;
// app.UseForwardedHeaders(new ForwardedHeadersOptions
// {
//     ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
// });

app.UseCors("AllowAngular");

// Swagger only in non-production
if (!string.Equals(app.Environment.EnvironmentName, "Production", StringComparison.OrdinalIgnoreCase))
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// OPTIONAL: Run EF Core migrations on startup (enable only if DB user has migration rights)
using (var scope = app.Services.CreateScope())
{
  var db = scope.ServiceProvider.GetService<GuruSevaDbContext>();
  if (db != null)
  {
    // db.Database.Migrate(); // <-- uncomment to enable automatic migrations
  }
}

app.Run();

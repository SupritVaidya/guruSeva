using Microsoft.EntityFrameworkCore;
using GuruSevaBackend.Models;


var builder = WebApplication.CreateBuilder(args);

// --- ADD THIS SECTION ---
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowFrontend",
      policy =>
      {
        // 1. Allow your Custom Domain (e.g. www.my-group.com)
        // 2. Allow localhost (so you can still test on your PC)
        policy.WithOrigins(
                  "https://www.krupasindhu.in",
                  "http://localhost:4200"
                )
                .AllowAnyMethod()
                .AllowAnyHeader();
      });
});

// Add CORS policy to allow any origin for development
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngularDev",
    policy => policy
      .AllowAnyOrigin()
      .AllowAnyHeader()
      .AllowAnyMethod()
  );
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<GuruSevaDbContext>(options =>
    options.UseSqlServer(connectionString)
);


var app = builder.Build();

app.UseCors("AllowFrontend");


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS policy
app.UseCors("AllowAngularDev");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

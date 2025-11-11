using Microsoft.EntityFrameworkCore;
using GuruSevaBackend.Models;


var builder = WebApplication.CreateBuilder(args);

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

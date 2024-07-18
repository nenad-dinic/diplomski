using API;
using API.Interfaces;
using API.Repositories;
using API.Services;
using Microsoft.EntityFrameworkCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Database connection
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "";
builder.Services.AddDbContext<ApplicationDBContext>(options => {
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

// Controllers
builder.Services.AddControllers();

// Services
builder.Services.AddScoped<UserService>();

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();

WebApplication app = builder.Build();

app.MapControllers();

app.Run();

using API;
using API.Interfaces.Repositories;
using API.Middlewares;
using API.Repositories;
using API.Services;
using API.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Configuration parameters
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "";
string publicDirectoryPath = builder.Configuration.GetValue<string>("PublicDirectoryPath") ?? "";
string jwtSecret = builder.Configuration.GetValue<string>("JWT:Secret") ?? "";

// Database connection
builder.Services.AddDbContext<ApplicationDBContext>(options => {
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    options.UseProjectables();
});

// Controllers
builder.Services.AddControllers().AddNewtonsoftJson(options => {
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});

// Services
builder.Services.AddScoped<AnalyticsService>();
builder.Services.AddScoped<ApartmentService>();
builder.Services.AddScoped<BillService>();
builder.Services.AddScoped<BillTypeService>();
builder.Services.AddScoped<BuildingService>();
builder.Services.AddScoped<MeetingService>();
builder.Services.AddScoped<PollService>();
builder.Services.AddScoped<RepairService>();
builder.Services.AddScoped<ResidentService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<VoteService>();

builder.Services.AddScoped<FileService>();
builder.Services.AddScoped<MailService>();

// Repositories
builder.Services.AddScoped<IApartmentRepository, ApartmentRepository>();
builder.Services.AddScoped<IBillRepository, BillRepository>();
builder.Services.AddScoped<IBillTypeRepository, BillTypeRepository>();
builder.Services.AddScoped<IBuildingRepository, BuildingRepository>();
builder.Services.AddScoped<IMeetingRepository, MeetingRepository>();
builder.Services.AddScoped<IPollRepository, PollRepository>();
builder.Services.AddScoped<IRepairRepository, RepairRepository>();
builder.Services.AddScoped<IResidentRepository, ResidentRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IVoteRepository, VoteRepository>();

builder.Services.AddTransient((_) => new AuthenticationMiddleware([
    new ExcludeRoute{Method = "POST", Path = "/auth/login"},
    new ExcludeRoute{Method = "POST", Path = "/auth/refresh"},
    new ExcludeRoute{Method = "POST", Path = "/auth/register"},
    new ExcludeRoute{Method = "POST", Path = "/auth/checkInvite"},
    new ExcludeRoute{Method = "GET", Path = "/public/*"}
]));

builder.Services.AddTransient<RoleGuardMiddleware>();

WebApplication app = builder.Build();

using (IServiceScope scope = app.Services.CreateScope()) {
    try {
        ApplicationDBContext context = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
    } catch {
        throw new Exception("Database connection failed");
    }
}

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapControllers();
app.UseStaticFiles(new StaticFileOptions {
    FileProvider = new PhysicalFileProvider(Path.GetFullPath(publicDirectoryPath)),
    RequestPath = "/public",
    OnPrepareResponse = ctx => {
        ctx.Context.Response.Headers.Append("Cache-Control", "public, max-age=600");
        ctx.Context.Response.Headers.Append("Content-Disposition", "attachment");
    }
});

app.UseMiddleware<AuthenticationMiddleware>();
app.UseMiddleware<RoleGuardMiddleware>();

app.Run();

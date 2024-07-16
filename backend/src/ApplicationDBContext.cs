using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API;

public class ApplicationDBContext : DbContext {

    public ApplicationDBContext(DbContextOptions options) : base(options) {}

    public DbSet<User> users {get; set;}

}
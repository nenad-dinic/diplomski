using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API;

public class ApplicationDBContext : DbContext {

    public ApplicationDBContext(DbContextOptions options) : base(options) {}

    public DbSet<Apartment> Apartments {get; set;}
    public DbSet<Bill> Bills {get; set;}
    public DbSet<BillType> BillTypes {get; set;}
    public DbSet<Building> Buildings {get; set;}
    public DbSet<Meeting> Meetings {get; set;}
    public DbSet<Poll> Polls {get; set;}
    public DbSet<Repair> Repairs {get; set;}
    public DbSet<Resident> Residents {get; set;}
    public DbSet<User> Users {get; set;}
    public DbSet<Vote> Votes {get; set;}

}
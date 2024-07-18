using API.Entities;
using API.Interfaces;
using API.Types;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class UserRepository(ApplicationDBContext context) : IUserRepository
{

    public async Task<List<User>> GetAll()
    {
        return await context.Users.ToListAsync();
    }

    public async Task<User?> GetById(int id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<User> Create(User user)
    {
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
        return user;
    }

    public async Task<User> Update(User user)
    {
        await context.SaveChangesAsync();
        return user;
    }

    public async Task<User> Delete(User user)
    {
        context.Users.Remove(user);
        await context.SaveChangesAsync();
        return user;
    }
}
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class UserRepository(ApplicationDBContext context) : Repository<User>(context), IUserRepository
{

    public async Task<User?> GetByUsername(string username) {
        return await context.Users.FirstOrDefaultAsync(u => u.Username == username);
    }

}
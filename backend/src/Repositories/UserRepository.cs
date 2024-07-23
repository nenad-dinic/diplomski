using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class UserRepository(ApplicationDBContext context) : Repository<User>(context), IUserRepository
{
    protected override List<string> GetSearchable()
    {
        return ["Username", "Email", "FullName"];
    }

    public async Task<User?> GetByUsername(string username) {
        return await context.Users.FirstOrDefaultAsync(u => u.Username == username);
    }

}
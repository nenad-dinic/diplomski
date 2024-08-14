using API.Entities;
using API.Interfaces.Repositories;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class UserRepository(ApplicationDBContext context) : Repository<User>(context), IUserRepository
{

    public async Task<User?> GetByUsernameOrEmail(string usernameOrEmail)
    {
        return await context.Users.FirstOrDefaultAsync(u => u.Username == usernameOrEmail || u.Email == usernameOrEmail);
    }

    public async Task<User?> GetByUsername(string username) {
        return await context.Users.FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task<User?> GetByEmail(string email) {
        return await context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<Page<User>> GetAllManagers(string filter, int page, int limit)
    {

        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<User>();

        predicate = predicate.And(t => t.Role == Role.Manager);

        predicate = predicate.And(t => EF.Functions.Like(t.Username, $"%{filter}%") || EF.Functions.Like(t.FullName, $"%{filter}%") || EF.Functions.Like(t.Email, $"%{filter}%"));

        List<User> users = await context.Users.Where(predicate).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Users.Where(predicate).CountAsync();

        return new Page<User>(users, total, page, limit);

    }

}
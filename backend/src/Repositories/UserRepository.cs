using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class UserRepository(ApplicationDBContext context) : Repository<User>(context), IUserRepository
{
    protected override List<string> GetSearchable()
    {
        return ["Username", "Email", "FullName"];
    }
}
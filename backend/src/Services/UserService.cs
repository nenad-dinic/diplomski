using API.Entities;
using Microsoft.EntityFrameworkCore.Internal;

namespace API.Services;

public class UserService(ApplicationDBContext context)
{

    private readonly ApplicationDBContext context = context;

    public List<User> GetAll() {

        List<User> users = context.users.ToList();

        return users;

    }

    public User? GetUserByID(int id) {

        User? user = context.users.Find(id);

        return user;

    }

}
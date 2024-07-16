using API.Entities;
using API.Types;

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

    public User? CreateUser(string username, string password, string fullName, string email, string phoneNumber, Role role) {

        User user = new User {
            username = username,
            password = BCrypt.Net.BCrypt.HashPassword(password, 10),
            fullName = fullName,
            email = email,
            phoneNumber = phoneNumber,
            role = role
        };

        try {
            context.users.Add(user);
            context.SaveChanges();
            return user;
        } catch {
            return null;
        }

    }

    public User? UpdateUser(int id, string? username, string? password, string? fullName, string? email, string? phoneNumber, Role? role) {

        User? user = context.users.FirstOrDefault(u => u.id == id);

        if(user == null) {
            return null;
        }

        user.username = username ?? user.username;

        if(password != null) {
            user.password = BCrypt.Net.BCrypt.HashPassword(password, 10);
        }

        user.fullName = fullName ?? user.fullName;
        user.email = email ?? user.email;
        user.phoneNumber = phoneNumber ?? user.phoneNumber;
        user.role = role ?? user.role;

        try {
            context.SaveChanges();
            return user;
        } catch {
            return null;
        }

    }

    public User? DeleteUser(int id) {

        User? user = context.users.FirstOrDefault(u => u.id == id);

        if(user == null) {
            return null;
        }

        try {
            context.users.Remove(user);
            context.SaveChanges();
            return user;
        } catch {
            return null;
        }

    }

}
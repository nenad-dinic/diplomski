using API.Entities;
using API.Types;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class UserService(ApplicationDBContext context)
{

    private readonly ApplicationDBContext context = context;

    public async Task<List<User>> GetAll() {

        List<User> users = await context.Users.ToListAsync();

        return users;

    }

    public async Task<User?> GetUserByID(int id) {

        User? user = await context.Users.FindAsync(id);

        return user;

    }

    public async Task<User?> CreateUser(string username, string password, string fullName, string email, string phoneNumber, Role role) {

        User user = new User {
            Username = username,
            Password = BCrypt.Net.BCrypt.HashPassword(password, 10),
            FullName = fullName,
            Email = email,
            PhoneNumber = phoneNumber,
            Role = role
        };

        try {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return user;
        } catch {
            return null;
        }

    }

    public async Task<User?> UpdateUser(int id, string? username, string? password, string? fullName, string? email, string? phoneNumber, Role? role) {

        User? user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if(user == null) {
            return null;
        }

        user.Username = username ?? user.Username;

        if(password != null) {
            user.Password = BCrypt.Net.BCrypt.HashPassword(password, 10);
        }

        user.FullName = fullName ?? user.FullName;
        user.Email = email ?? user.Email;
        user.PhoneNumber = phoneNumber ?? user.PhoneNumber;
        user.Role = role ?? user.Role;

        try {
            await context.SaveChangesAsync();
            return user;
        } catch {
            return null;
        }

    }

    public async Task<User?> DeleteUser(int id) {

        User? user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if(user == null) {
            return null;
        }

        try {
            context.Users.Remove(user);
            await context.SaveChangesAsync();
            return user;
        } catch {
            return null;
        }

    }

}
using API.Entities;
using API.Types;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class UserService(ApplicationDBContext context)
{

    private readonly ApplicationDBContext context = context;

    public async Task<List<User>> GetAll() {

        List<User> users = await context.users.ToListAsync();

        return users;

    }

    public async Task<User?> GetUserByID(int id) {

        User? user = await context.users.FindAsync(id);

        return user;

    }

    public async Task<User?> CreateUser(string username, string password, string fullName, string email, string phoneNumber, Role role) {

        User user = new User {
            username = username,
            password = BCrypt.Net.BCrypt.HashPassword(password, 10),
            fullName = fullName,
            email = email,
            phoneNumber = phoneNumber,
            role = role
        };

        try {
            await context.users.AddAsync(user);
            await context.SaveChangesAsync();
            return user;
        } catch {
            return null;
        }

    }

    public async Task<User?> UpdateUser(int id, string? username, string? password, string? fullName, string? email, string? phoneNumber, Role? role) {

        User? user = await context.users.FirstOrDefaultAsync(u => u.id == id);

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
            await context.SaveChangesAsync();
            return user;
        } catch {
            return null;
        }

    }

    public async Task<User?> DeleteUser(int id) {

        User? user = await context.users.FirstOrDefaultAsync(u => u.id == id);

        if(user == null) {
            return null;
        }

        try {
            context.users.Remove(user);
            await context.SaveChangesAsync();
            return user;
        } catch {
            return null;
        }

    }

}
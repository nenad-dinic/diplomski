using API.Entities;
using API.Interfaces.Repositories;
using API.Types;
using API.Utils;

namespace API.Services;

public class UserService(IUserRepository userRepository)
{

    public async Task<Page<User>> GetAll(string filter, int page, int limit) {

        Page<User> users = await userRepository.GetAll(filter, page, limit);

        return users;

    }

    public async Task<User?> GetUserById(int id) {

        User? user = await userRepository.GetById(id);

        return user;

    }

    public async Task<User?> GetUserByUsername(string username) {

        User? user = await userRepository.GetByUsername(username);

        return user;

    }

    public async Task<User?> CreateUser(string username, string password, string fullName, string email, string phoneNumber, Role role) {

        User user = new() {
            Username = username,
            Password = BCrypt.Net.BCrypt.HashPassword(password, 10),
            FullName = fullName,
            Email = email,
            PhoneNumber = phoneNumber,
            Role = role,
            JTI = JsonWebTokenUtils.GenerateJTI(5)
        };

        try {
            return await userRepository.Create(user);
        } catch {
            return null;
        }

    }

    public async Task<User?> UpdateUser(int id, string? username, string? password, string? fullName, string? email, string? phoneNumber, Role? role) {

        User? user = await userRepository.GetById(id);

        if(user == null) {
            return null;
        }

        user.Username = username ?? user.Username;

        if(password != null) {
            user.Password = BCrypt.Net.BCrypt.HashPassword(password, 10);
            user.JTI = JsonWebTokenUtils.GenerateJTI(5);
        }

        user.FullName = fullName ?? user.FullName;
        user.Email = email ?? user.Email;
        user.PhoneNumber = phoneNumber ?? user.PhoneNumber;
        user.Role = role ?? user.Role;

        try {
            return await userRepository.Update(user);
        } catch {
            return null;
        }

    }

    public async Task<User?> DeleteUser(int id) {

        User? user = await userRepository.GetById(id);

        if(user == null) {
            return null;
        }

        try {
            return await userRepository.Delete(user);
        } catch {
            return null;
        }

    }

}
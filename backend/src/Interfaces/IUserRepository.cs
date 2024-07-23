using API.Entities;

namespace API.Interfaces;

public interface IUserRepository : IRepository<User> {

    public Task<User?> GetByUsername(string username);

}
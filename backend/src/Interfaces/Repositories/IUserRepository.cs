using API.Entities;

namespace API.Interfaces.Repositories;

public interface IUserRepository : IRepository<User> {

    public Task<User?> GetByUsername(string username);

}
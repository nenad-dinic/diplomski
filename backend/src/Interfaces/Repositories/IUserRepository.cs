using API.Entities;
using API.Types;

namespace API.Interfaces.Repositories;

public interface IUserRepository : IRepository<User> {

    public Task<User?> GetByUsername(string username);

    public Task<Page<User>> GetAllManagers(string filter, int page, int limit);

}
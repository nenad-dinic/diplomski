using API.Entities;
using API.Types;

namespace API.Interfaces.Repositories;

public interface IUserRepository : IRepository<User> {

    Task<User?> GetByUsername(string username);

    Task<Page<User>> GetAllManagers(string filter, int page, int limit);

}
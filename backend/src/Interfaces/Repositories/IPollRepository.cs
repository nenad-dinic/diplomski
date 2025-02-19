using API.Entities;
using API.Types;

namespace API.Interfaces.Repositories;

public interface IPollRepository : IRepository<Poll> {

    Task<Page<Poll>> GetByBuildingId(int buildingId, string filter, int page, int limit);
    Task<Page<Poll>> GetActivePollsByUserId(int userId, string filter, int page, int limit);

}
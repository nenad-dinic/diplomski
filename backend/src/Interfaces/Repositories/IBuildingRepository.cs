using API.Entities;
using API.Types;

namespace API.Interfaces.Repositories;

public interface IBuildingRepository : IRepository<Building> {

    Task<int> GetNumberOfBuildings();

    Task<Page<Building>> GetByManagerId(int managerId, string filter, int page, int limit);

}
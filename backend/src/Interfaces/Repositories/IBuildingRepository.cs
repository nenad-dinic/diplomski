using API.Entities;

namespace API.Interfaces.Repositories;

public interface IBuildingRepository : IRepository<Building> {

    Task<int> GetNumberOfBuildings();

}
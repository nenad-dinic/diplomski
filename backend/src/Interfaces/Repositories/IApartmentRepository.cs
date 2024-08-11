using API.Entities;
using API.Types;

namespace API.Interfaces.Repositories;

public interface IApartmentRepository : IRepository<Apartment> {

    Task<Page<Apartment>> GetByBuildingId(int buildingId, string filter, int page, int limit);
    Task<int> GetNumberOfApartments();
    Task<Page<Apartment>> GetByUserId(int userId, string filter, int page, int limit);

}
using API.Entities;
using API.Types;

namespace API.Interfaces;

public interface IApartmentRepository : IRepository<Apartment> {
    
    Task<Page<Apartment>> GetByBuildingId(int buildingId, string filter, int page, int limit);

}
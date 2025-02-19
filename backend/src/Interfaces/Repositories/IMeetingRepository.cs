using API.Entities;
using API.Types;

namespace API.Interfaces.Repositories;

public interface IMeetingRepository : IRepository<Meeting> {
    
    Task<Page<Meeting>> GetByBuildingId(int buildingId, string filter, int page, int limit);

    Task<Page<Meeting>> GetActiveByResidentId(int residentId, string filter, int page, int limit);

}
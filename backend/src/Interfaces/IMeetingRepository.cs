using API.Entities;
using API.Types;

namespace API.Interfaces;

public interface IMeetingRepository : IRepository<Meeting> {
    
    Task<Page<Meeting>> GetByBuildingId(int buildingId, string filter, int page, int limit);

}
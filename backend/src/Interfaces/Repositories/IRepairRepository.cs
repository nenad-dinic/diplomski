using API.Entities;
using API.Types;

namespace API.Interfaces.Repositories;

public interface IRepairRepository : IRepository<Repair> {

    Task<Page<Repair>> GetByApartmentId(int apartmentId, string filter, int page, int limit);

}
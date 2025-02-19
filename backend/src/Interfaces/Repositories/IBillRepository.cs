using API.Entities;
using API.Types;

namespace API.Interfaces.Repositories;

public interface IBillRepository : IRepository<Bill> {

    Task<Page<Bill>> GetByApartmentId(int apartmentId, string filter, int page, int limit);

}
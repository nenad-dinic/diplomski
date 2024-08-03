using API.Entities;
using API.Types;

namespace API.Interfaces.Repositories;

public interface IResidentRepository : IRepository<Resident> {

    Task<Page<Resident>> GetByApartmentId(int apartmentId, string filter, int page, int limit);

}
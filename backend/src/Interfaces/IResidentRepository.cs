using API.Entities;
using API.Types;

namespace API.Interfaces;

public interface IResidentRepository : IRepository<Resident> {

    Task<Page<Resident>> GetByApartmentId(int apartmentId, string filter, int page, int limit);

}
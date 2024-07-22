using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class ApartmentRepository(ApplicationDBContext context) : Repository<Apartment>(context), IApartmentRepository
{
    public override List<string> GetSearchable()
    {
        return [];
    }
}
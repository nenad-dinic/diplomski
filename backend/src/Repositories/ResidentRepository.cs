using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class ResidentRepository(ApplicationDBContext context) : Repository<Resident>(context), IResidentRepository
{
    protected override List<string> GetSearchable()
    {
        return [];
    }
}
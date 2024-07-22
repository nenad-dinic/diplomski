using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class RepairRepository(ApplicationDBContext context) : Repository<Repair>(context), IRepairRepository
{
    public override List<string> GetSearchable()
    {
        return [];
    }
}
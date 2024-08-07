using API.Entities;
using API.Interfaces.Repositories;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class BuildingRepository(ApplicationDBContext context) : Repository<Building>(context), IBuildingRepository
{
    public async Task<Page<Building>> GetByManagerId(int managerId, string filter, int page, int limit)
    {

        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<Building>();

        predicate = predicate.And(t => t.ManagerId == managerId);

        predicate = predicate.And(t => EF.Functions.Like(t.Address, $"%{filter}%"));

        List<Building> buildings = await context.Buildings.Where(predicate).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Buildings.Where(predicate).CountAsync();

        return new Page<Building>(buildings, total, page, limit);

    }

    public async Task<int> GetNumberOfBuildings() {
        return await context.Buildings.CountAsync();
    }
}
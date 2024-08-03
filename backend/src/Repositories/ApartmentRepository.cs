using API.Entities;
using API.Interfaces.Repositories;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class ApartmentRepository(ApplicationDBContext context) : Repository<Apartment>(context), IApartmentRepository
{
    public async Task<Page<Apartment>> GetByBuildingId(int buildingId, string filter, int page, int limit) {

        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<Apartment>();

        predicate = predicate.And(t => t.BuildingId == buildingId);
        predicate = predicate.And(t => EF.Functions.Like(t.Number.ToString(), $"%{filter}%"));

        List<Apartment> buildings = await context.Apartments.Where(predicate).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Apartments.Where(predicate).CountAsync();

        return new Page<Apartment>(buildings, total, page, limit);
    }

}
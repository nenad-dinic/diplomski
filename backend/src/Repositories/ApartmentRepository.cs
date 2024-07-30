using API.Entities;
using API.Interfaces;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class ApartmentRepository(ApplicationDBContext context) : Repository<Apartment>(context), IApartmentRepository
{
    protected override List<string> GetSearchable()
    {
        return [];
    }

    public async Task<Page<Apartment>> GetByBuildingId(int buildingId, string filter, int page, int limit) {

        int offset = (page - 1) * limit;

        List<string> fields = GetSearchable();

        var predicate = fields.Count > 0 ? PredicateBuilder.False<Apartment>() : PredicateBuilder.True<Apartment>();

        foreach (string field in fields) {
            predicate = predicate.Or(t => EF.Property<string>(t, field).Contains(filter));
        }

        predicate = predicate.And(t => t.BuildingId == buildingId);

        List<Apartment> buildings = await context.Apartments.Where(predicate).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Apartments.Where(predicate).CountAsync();

        return new Page<Apartment>(buildings, total, page, limit);
    }

}
using API.Entities;
using API.Interfaces;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class ResidentRepository(ApplicationDBContext context) : Repository<Resident>(context), IResidentRepository
{
    protected override List<string> GetSearchable()
    {
        return [];
    }

    public async Task<Page<Resident>> GetByApartmentId(int apartmentId, string filter, int page, int limit)
    {

        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<Resident>();

        predicate = predicate.And(t => t.ApartmentId == apartmentId);

        predicate = predicate.And(t => EF.Functions.Like(t.User!.Email, $"%{filter}%") || EF.Functions.Like(t.User!.Username, $"%{filter}%") || EF.Functions.Like(t.User!.FullName, $"%{filter}%"));

        List<Resident> residents = await context.Residents.Where(predicate).Skip(offset).Take(limit).Include(t => t.User).ToListAsync();
        int total = await context.Residents.Where(predicate).CountAsync();

        return new Page<Resident>(residents, total, page, limit);
    }

}
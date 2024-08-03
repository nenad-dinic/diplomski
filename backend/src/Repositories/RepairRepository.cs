using API.Entities;
using API.Interfaces.Repositories;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class RepairRepository(ApplicationDBContext context) : Repository<Repair>(context), IRepairRepository
{

    public async Task<Page<Repair>> GetByApartmentId(int apartmentId, string filter, int page, int limit) {

        int offset = (page - 1) / limit;

        var predicate = PredicateBuilder.True<Repair>();

        predicate = predicate.And(t => t.ApartmentId == apartmentId);

        predicate = predicate.And(t => EF.Functions.Like(t.User!.Username, $"%{filter}%") || EF.Functions.Like(t.User!.Email, $"%{filter}%") || EF.Functions.Like(t.User!.FullName, $"%{filter}%"));

        List<Repair> repairs = await context.Repairs.Where(predicate).Include(t => t.User).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Repairs.Where(predicate).CountAsync();

        return new Page<Repair>(repairs, total, page, limit);

    }

}
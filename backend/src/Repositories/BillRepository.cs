using API.Entities;
using API.Interfaces;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class BillRepository(ApplicationDBContext context) : Repository<Bill>(context), IBillRepository {

    public override async Task<Bill?> GetById(int id) {

        Bill? bill = await context.Bills.Include(b => b.BillType).FirstOrDefaultAsync(b => b.Id == id);
        return bill;

    }

    public async Task<Page<Bill>> GetByApartmentId(int apartmentId, string filter, int page, int limit) {

        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<Bill>();

        predicate = predicate.And(t => t.ApartmentId == apartmentId);

        predicate = predicate.And(t => EF.Functions.Like(t.FileName, $"%{filter}%") || EF.Functions.Like(t.BillType!.Name, $"%{filter}%"));

        List<Bill> bills = await context.Bills.Where(predicate).Skip(offset).Take(limit).Include(t => t.BillType).ToListAsync();
        int total = await context.Bills.Where(predicate).CountAsync();

        return new Page<Bill>(bills, total, page, limit);

    }

}
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class BillRepository(ApplicationDBContext context) : Repository<Bill>(context), IBillRepository {

    public override async Task<Bill?> GetById(int id) {

        Bill? bill = await context.Bills.Include(b => b.BillType).FirstOrDefaultAsync(b => b.Id == id);
        return bill;

    }

}
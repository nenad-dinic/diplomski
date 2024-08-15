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

        List<Apartment> apartments = await context.Apartments.Where(predicate).Skip(offset).Take(limit).Include(t => t.Residents).Include(t => t.Building!.Manager).ToListAsync();
        int total = await context.Apartments.Where(predicate).CountAsync();

        return new Page<Apartment>(apartments, total, page, limit);
    }

    public async Task<Page<Apartment>> GetByUserId(int userId, string filter, int page, int limit)
    {
        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<Apartment>();

        predicate = predicate.And(t => t.Residents.Any(r => r.UserId == userId));
        predicate = predicate.And(t => EF.Functions.Like(t.Number.ToString(), $"%{filter}%"));

        List<Apartment> apartments = await context.Apartments.Where(predicate).Include(a => a.Building).Include(a => a.Residents.Where(r => r.IsOwner)).Include(a => a.Building!.Manager).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Apartments.Where(predicate).CountAsync();

        return new Page<Apartment>(apartments, total, page, limit);
    }

    public async Task<int> GetNumberOfApartments()
    {
        return await context.Apartments.CountAsync();
    }

    public async Task<Apartment?> SetOwner(int apartmentId, int userId)
    {
        
        Apartment? apartment = await context.Apartments.Include(a => a.Residents).FirstOrDefaultAsync(a => a.Id == apartmentId);

        if(apartment == null) {
            return null;
        }

        if(apartment.Residents.All(r => r.UserId != userId)) {
            return null;
        }

        apartment.Residents.ForEach(r => r.IsOwner = r.UserId == userId);

        await context.SaveChangesAsync();

        return apartment;

    }
}
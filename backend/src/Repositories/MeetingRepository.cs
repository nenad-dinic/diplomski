using API.Entities;
using API.Interfaces.Repositories;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class MeetingRepository(ApplicationDBContext context) : Repository<Meeting>(context), IMeetingRepository
{
    public async Task<Page<Meeting>> GetActiveByResidentId(int userId, string filter, int page, int limit)
    {
        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<Meeting>();

        predicate = predicate.And(t => t.Building!.Apartments.Any(a => a.Residents.Any(r => r.UserId == userId && r.IsOwner)));
        predicate = predicate.And(t => t.DateTime.AddMinutes(t.Length) > DateTimeOffset.Now);

        List<Meeting> meetings = await context.Meetings.Where(predicate).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Meetings.Where(predicate).CountAsync();

        return new Page<Meeting>(meetings, total, page, limit);
    }

    public async Task<Page<Meeting>> GetByBuildingId(int buildingId, string filter, int page, int limit) {
        
        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<Meeting>();

        predicate = predicate.And(t => t.BuildingId == buildingId);

        List<Meeting> meetings = await context.Meetings.Where(predicate).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Meetings.Where(predicate).CountAsync();

        return new Page<Meeting>(meetings, total, page, limit);

    }

}
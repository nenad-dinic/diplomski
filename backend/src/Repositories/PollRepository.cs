using API.Entities;
using API.Interfaces.Repositories;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class PollRepository(ApplicationDBContext context) : Repository<Poll>(context), IPollRepository
{
    public async Task<Page<Poll>> GetActivePollsByUserId(int userId, string filter, int page, int limit)
    {
        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<Poll>();

        predicate = predicate.And(t => t.IsActive);
        predicate = predicate.And(t => t.Building!.Apartments.Any(a => a.Residents.Any(r => r.UserId == userId && r.IsOwner)));
        predicate = predicate.And(t => t.Votes.All(v => v.UserId != userId));
        predicate = predicate.And(t => EF.Functions.Like(t.Title, $"%{filter}%"));

        List<Poll> polls = await context.Polls.Where(predicate).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Polls.Where(predicate).CountAsync();

        return new Page<Poll>(polls, total, page, limit);

    }

    public async Task<Page<Poll>> GetByBuildingId(int buildingId, string filter, int page, int limit)
    {
        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<Poll>();

        predicate = predicate.And(t => t.BuildingId == buildingId);
        predicate = predicate.And(t => EF.Functions.Like(t.Title, $"%{filter}%"));

        List<Poll> polls = await context.Polls.Where(predicate).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Polls.Where(predicate).CountAsync();

        return new Page<Poll>(polls, total, page, limit);

    }

}
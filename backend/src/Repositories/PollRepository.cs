using API.Entities;
using API.Interfaces;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class PollRepository(ApplicationDBContext context) : Repository<Poll>(context), IPollRepository
{
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

    protected override List<string> GetSearchable()
    {
        return ["Title"];
    }
}
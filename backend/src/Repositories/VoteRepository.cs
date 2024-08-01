using API.Entities;
using API.Interfaces;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class VoteRepository(ApplicationDBContext context) : Repository<Vote>(context), IVoteRepository
{
    public async Task<Page<Vote>> GetByPollId(int pollId, string filter, int page, int limit)
    {
        
        int offset = (page - 1) * limit;

        var predicate = PredicateBuilder.True<Vote>();

        predicate = predicate.And(t => t.PollId == pollId);
        predicate = predicate.And(t => EF.Functions.Like(t.User!.Username, $"%{filter}%") || EF.Functions.Like(t.User!.Email, $"%{filter}%") || EF.Functions.Like(t.User!.FullName, $"%{filter}%"));

        List<Vote> votes = await context.Votes.Where(predicate).Skip(offset).Take(limit).Include(v => v.User).ToListAsync();
        int total = await context.Votes.Where(predicate).CountAsync();

        return new Page<Vote>(votes, total, page, limit);

    }

    protected override List<string> GetSearchable()
    {
        return [];
    }
}
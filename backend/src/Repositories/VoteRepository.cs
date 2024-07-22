using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class VoteRepository(ApplicationDBContext context) : Repository<Vote>(context), IVoteRepository
{
    public override List<string> GetSearchable()
    {
        return [];
    }
}
using API.Entities;
using API.Types;

namespace API.Interfaces;

public interface IVoteRepository : IRepository<Vote> {

    Task<Page<Vote>> GetByPollId(int pollId, string filter, int page, int limit);

}
using API.Entities;
using API.Interfaces;
using API.Types;

namespace API.Services;

public class VoteService(IVoteRepository voteRepository) {

    public async Task<Page<Vote>> GetAll(string filter, int page, int limit) {

        Page<Vote> votes = await voteRepository.GetAll(filter, page, limit);

        return votes;

    }

    public async Task<Page<Vote>> GetVotesByPoll(int pollId, string filter, int page, int limit) {

        Page<Vote> votes = await voteRepository.GetByPollId(pollId, filter, page, limit);

        return votes;

    }

    public async Task<Vote?> GetVoteById(int id) {

        Vote? vote = await voteRepository.GetById(id);

        return vote;

    }

    public async Task<Vote?> CreateVote(int userId, int pollId, bool result) {

        Vote vote = new() {
            UserId = userId,
            PollId = pollId,
            Result = result
        };

        try {
            return await voteRepository.Create(vote);
        } catch {
            return null;
        }

    }

    public async Task<Vote?> UpdateVote(int id, int? userId, int? pollId, bool? result) {

        Vote? vote = await voteRepository.GetById(id);

        if(vote == null) {
            return null;
        }

        vote.UserId = userId ?? vote.UserId;
        vote.PollId = pollId ?? vote.PollId;
        vote.Result = result ?? vote.Result;

        try {
            return await voteRepository.Update(vote);
        } catch {
            return null;
        }

    }

    public async Task<Vote?> DeleteVote(int id) {

        Vote? vote = await voteRepository.GetById(id);

        if(vote == null) {
            return null;
        }

        try {
            return await voteRepository.Delete(vote);
        } catch {
            return null;
        }

    }

}
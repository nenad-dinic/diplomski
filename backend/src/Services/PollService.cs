using API.Entities;
using API.Interfaces;

namespace API.Services;

public class PollService(IPollRepository pollRepository) {

    public async Task<List<Poll>> GetAll() {

        List<Poll> polls = await pollRepository.GetAll();

        return polls;

    }

    public async Task<Poll?> GetPollById(int id) {

        Poll? poll = await pollRepository.GetById(id);

        return poll;

    }

    public async Task<Poll?> CreatePoll(int buildingId, string title, bool isActive) {

        Poll poll = new() {
            BuildingId = buildingId,
            Title = title,
            IsActive = isActive
        };

        try {
            return await pollRepository.Create(poll);
        } catch {
            return null;
        }

    }

    public async Task<Poll?> UpdatePoll(int id, int? buildingId, string? title, bool? isActive) {

        Poll? poll = await pollRepository.GetById(id);

        if(poll == null) {
            return null;
        }

        poll.BuildingId = buildingId ?? poll.BuildingId;
        poll.Title = title ?? poll.Title;
        poll.IsActive = isActive ?? poll.IsActive;

        try {
            return await pollRepository.Update(poll);
        } catch {
            return null;
        }

    }

    public async Task<Poll?> DeletePoll(int id) {

        Poll? poll = await pollRepository.GetById(id);

        if(poll == null) {
            return null;
        }

        try {
            return await pollRepository.Delete(poll);
        } catch {
            return null;
        }

    }

}
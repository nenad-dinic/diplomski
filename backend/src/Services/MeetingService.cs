using API.Entities;
using API.Interfaces.Repositories;
using API.Types;

namespace API.Services;

public class MeetingService(IMeetingRepository meetingRepository) {

    public async Task<Page<Meeting>> GetAll(string filter, int page, int limit) {

        Page<Meeting> meetings = await meetingRepository.GetAll(filter, page, limit);

        return meetings;

    }

    public async Task<Page<Meeting>> GetMeetingsByBuilding(int buildingId, string filter, int page, int limit) {

        Page<Meeting> meetings = await meetingRepository.GetByBuildingId(buildingId, filter, page, limit);

        return meetings;

    }

    public async Task<Meeting?> GetMeetingById(int id) {

        Meeting? meeting = await meetingRepository.GetById(id);

        return meeting;

    }

    public async Task<Meeting?> CreateMeeting(int buildingId, DateTimeOffset dateTime, int length, string description) {

        Meeting meeting = new() {
            BuildingId = buildingId,
            DateTime = dateTime,
            Length = length,
            Description = description
        };

        try {
            return await meetingRepository.Create(meeting);
        } catch {
            return null;
        }

    }

    public async Task<Meeting?> UpdateMeeting(int id, int? buildingId, DateTimeOffset? dateTime, int? length, string? description) {

        Meeting? meeting = await meetingRepository.GetById(id);

        if(meeting == null) {
            return null;
        }

        meeting.BuildingId = buildingId ?? meeting.BuildingId;
        meeting.DateTime = dateTime ?? meeting.DateTime;
        meeting.Length = length ?? meeting.Length;
        meeting.Description = description ?? meeting.Description;

        try {
            return await meetingRepository.Update(meeting);
        } catch {
            return null;
        }

    }

    public async Task<Meeting?> DeleteMeeting(int id) {

        Meeting? meeting = await meetingRepository.GetById(id);

        if(meeting == null) {
            return null;
        }

        try {
            await meetingRepository.Delete(meeting);
            return meeting;
        } catch {
            return null;
        }

    }

}
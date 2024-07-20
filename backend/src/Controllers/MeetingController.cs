using API.Dtos.Meeting;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/meeting")]
[ApiController]
public class MeetingController(MeetingService meetingService) : ControllerBase {

    [HttpGet]
    public async Task<IActionResult> GetAllMeetings() {

        List<Meeting> meetings = await meetingService.GetAll();

        return Ok(meetings);

    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMeetingById([FromRoute] int id) {

        Meeting? meeting = await meetingService.GetMeetingById(id);

        if(meeting == null) {
            return NotFound();
        }

        return Ok(meeting);

    }

    [HttpPost]
    public async Task<IActionResult> CreateMeeting([FromBody] CreateMeetingBody body) {

        Meeting? meeting = await meetingService.CreateMeeting(body.BuildingId, body.DateTime, body.Length, body.Description);

        if(meeting == null) {
            return BadRequest();
        }

        return Ok(meeting);

    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMeeting([FromRoute] int id, [FromBody] UpdateMeetingBody body) {

        Meeting? meeting = await meetingService.UpdateMeeting(id, body.BuildingId, body.DateTime, body.Length, body.Description);

        if(meeting == null) {
            return NotFound();
        }

        return Ok(meeting);

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMeeting([FromRoute] int id) {

        Meeting? meeting = await meetingService.DeleteMeeting(id);

        if(meeting == null) {
            return NotFound();
        }

        return Ok(meeting);

    }

}
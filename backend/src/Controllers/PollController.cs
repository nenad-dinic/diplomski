using API.Dtos.Poll;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/poll")]
[ApiController]
public class PollController(PollService pollService) : ControllerBase {

    [HttpGet]
    public async Task<IActionResult> GetAllPolls() {

        List<Poll> polls = await pollService.GetAll();

        return Ok(polls);

    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetPollById([FromRoute] int id) {

        Poll? poll = await pollService.GetPollById(id);

        if(poll == null) {
            return NotFound();
        }

        return Ok(poll);

    }

    [HttpPost]
    public async Task<IActionResult> CreatePoll([FromBody] CreatePollBody body) {

        Poll? poll = await pollService.CreatePoll(body.BuildingId, body.Title, true);

        if(poll == null) {
            return BadRequest();
        }

        return Ok(poll);

    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdatePoll([FromRoute] int id, [FromBody] UpdatePollBody body) {

        Poll? poll = await pollService.UpdatePoll(id, body.BuildingId, body.Title, body.IsActive);

        if(poll == null) {
            return BadRequest();
        }

        return Ok(poll);

    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeletePoll([FromRoute] int id) {

        Poll? poll = await pollService.DeletePoll(id);

        if(poll == null) {
            return BadRequest();
        }

        return Ok(poll);
        
    }

}
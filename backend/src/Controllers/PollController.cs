using API.Attributes;
using API.Dtos;
using API.Dtos.Poll;
using API.Entities;
using API.Services;
using API.Types;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/poll")]
[ApiController]
public class PollController(PollService pollService) : ControllerBase {

    [HttpGet]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetAllPolls([FromQuery] PageableQuery query) {

        Page<Poll> polls = await pollService.GetAll(query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(polls);

    }

    [HttpGet("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetPollById([FromRoute] int id) {

        Poll? poll = await pollService.GetPollById(id);

        if(poll == null) {
            return NotFound();
        }

        return Ok(poll);

    }

    [HttpGet("building/{buildingId:int}")]
    [AllowedRoles(Role.Admin, Role.Manager)]
    public async Task<IActionResult> GetPollsByBuilding([FromRoute] int buildingId, [FromQuery] PageableQuery query) {

        Page<Poll> polls = await pollService.GetPollsByBuilding(buildingId, query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(polls);

    }

    [HttpPost]
    [AllowedRoles(Role.Admin, Role.Manager)]
    public async Task<IActionResult> CreatePoll([FromBody] CreatePollBody body) {

        Poll? poll = await pollService.CreatePoll(body.BuildingId, body.Title, true);

        if(poll == null) {
            return BadRequest();
        }

        return Ok(poll);

    }

    [HttpPut("{id:int}")]
    [AllowedRoles(Role.Admin, Role.Manager)]
    public async Task<IActionResult> UpdatePoll([FromRoute] int id, [FromBody] UpdatePollBody body) {

        Poll? poll = await pollService.UpdatePoll(id, body.BuildingId, body.Title, body.IsActive);

        if(poll == null) {
            return BadRequest();
        }

        return Ok(poll);

    }

    [HttpDelete("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> DeletePoll([FromRoute] int id) {

        Poll? poll = await pollService.DeletePoll(id);

        if(poll == null) {
            return BadRequest();
        }

        return Ok(poll);
        
    }

}
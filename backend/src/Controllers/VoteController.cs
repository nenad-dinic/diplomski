using API.Attributes;
using API.Dtos;
using API.Dtos.Vote;
using API.Entities;
using API.Services;
using API.Types;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/vote")]
[ApiController]
public class VoteController(VoteService voteService) : ControllerBase {

    [HttpGet]
    [AllowedRoles(Role.Admin)]

    public async Task<IActionResult> GetAllVotes([FromQuery] PageableQuery query) {

        Page<Vote> votes = await voteService.GetAll(query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(votes);

    }

    [HttpGet("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetVoteById([FromRoute] int id) {

        Vote? vote = await voteService.GetVoteById(id);

        if(vote == null) {
            return NotFound();
        }

        return Ok(vote);

    }

    [HttpPost]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> CreateVote([FromBody] CreateVoteBody body) {
        
        Vote? vote = await voteService.CreateVote(body.UserId, body.PollId, body.Result);

        if(vote == null) {
            return BadRequest();
        }

        return Ok(vote);

    }

    [HttpPut("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> UpdateVote([FromRoute] int id, [FromBody] UpdateVoteBody body) {

        Vote? vote = await voteService.UpdateVote(id, body.UserId, body.PollId, body.Result);

        if(vote == null) {
            return BadRequest();
        }

        return Ok(vote);

    }

    [HttpDelete("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> DeleteVote([FromRoute] int id) {

        Vote? vote = await voteService.DeleteVote(id);

        if(vote == null) {
            return BadRequest();
        }

        return Ok(vote);

    }

}
using API.Attributes;
using API.Dtos;
using API.Dtos.Resident;
using API.Entities;
using API.Services;
using API.Types;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/resident")]
[ApiController]
public class ResidentController(ResidentService residentService) : ControllerBase {

    [HttpGet]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetAllResidents([FromQuery] PageableQuery query) {

        Page<Resident> residents = await residentService.GetAll(query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(residents);

    }

    [HttpGet("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetResidentById([FromRoute] int id) {

        Resident? resident = await residentService.GetResidentById(id);

        if(resident == null) {
            return NotFound();
        }

        return Ok(resident);

    }

    [HttpPost]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> CreateResident([FromBody] CreateResidentBody body) {

        Resident? resident = await residentService.CreateResident(body.UserId, body.ApartmentId, body.Expires, body.IsOwner);

        if(resident == null) {
            return BadRequest();
        }

        return Ok(resident);

    }

    [HttpPut("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> UpdateResident([FromRoute] int id, [FromBody] UpdateResidentBody body) {

        Resident? resident = await residentService.UpdateResident(id, body.UserId, body.ApartmentId, body.Expires, body.IsOwner);

        if(resident == null) {
            return BadRequest();
        }

        return Ok(resident);

    }

    [HttpDelete("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> DeleteResident([FromRoute] int id) {

        Resident? resident = await residentService.DeleteResident(id);

        if(resident == null) {
            return BadRequest();
        }

        return Ok(resident);

    }

}
using API.Dtos.Resident;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/resident")]
[ApiController]
public class ResidentController(ResidentService residentService) : ControllerBase {

    [HttpGet]
    public async Task<IActionResult> GetAllResidents() {

        List<Resident> residents = await residentService.GetAll();

        return Ok(residents);

    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetResidentById([FromRoute] int id) {

        Resident? resident = await residentService.GetResidentById(id);

        if(resident == null) {
            return NotFound();
        }

        return Ok(resident);

    }

    [HttpPost]
    public async Task<IActionResult> CreateResident([FromBody] CreateResidentBody body) {

        Resident? resident = await residentService.CreateResident(body.UserId, body.ApartmentId, body.Expires, body.IsOwner);

        if(resident == null) {
            return BadRequest();
        }

        return Ok(resident);

    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateResident([FromRoute] int id, [FromBody] UpdateResidentBody body) {

        Resident? resident = await residentService.UpdateResident(id, body.UserId, body.ApartmentId, body.Expires, body.IsOwner);

        if(resident == null) {
            return BadRequest();
        }

        return Ok(resident);

    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteResident([FromRoute] int id) {

        Resident? resident = await residentService.DeleteResident(id);

        if(resident == null) {
            return BadRequest();
        }

        return Ok(resident);

    }

}

using API.Attributes;
using API.Dtos;
using API.Dtos.Repair;
using API.Entities;
using API.Services;
using API.Types;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/repair")]
[ApiController]
public class RepairController(RepairService repairService) : ControllerBase {

    [HttpGet]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetAllRepairs([FromQuery] PageableQuery query) {

        Page<Repair> repairs = await repairService.GetAll(query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(repairs);

    }

    [HttpGet("apartment/{apartmentId:int}")]
    [AllowedRoles(Role.Admin, Role.Resident)]
    public async Task<IActionResult> GetRepairsByApartment([FromRoute] int apartmentId, [FromQuery] PageableQuery query) {

        Page<Repair> repairs = await repairService.GetRepairsByApartment(apartmentId, query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(repairs);

    }

    [HttpGet("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetRepairById([FromRoute] int id) {

        Repair? repair = await repairService.GetRepairById(id);

        if(repair == null) {
            return NotFound();
        }

        return Ok(repair);

    }

    [HttpPost]
    [AllowedRoles(Role.Admin, Role.Resident)]
    public async Task<IActionResult> CreateRepair([FromBody] CreateRepairBody body) {

        Repair? repair = await repairService.CreateRepair(body.UserId, body.ApartmentId, body.Description, false);

        if(repair == null) {
            return NotFound();
        }

        return Ok(repair);

    }

    [HttpPut("{id:int}")]
    [AllowedRoles(Role.Admin, Role.Resident)]
    public async Task<IActionResult> UpdateRepair([FromRoute] int id, [FromBody] UpdateRepairBody body) {

        Repair? repair = await repairService.UpdateRepair(id, body.UserId, body.ApartmentId, body.Description, body.IsRepaired);

        if(repair == null) {
            return NotFound();
        }

        return Ok(repair);

    }

    [HttpDelete("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> DeleteRepair([FromRoute] int id) {

        Repair? repair = await repairService.DeleteRepair(id);

        if(repair == null) {
            return NotFound();
        }

        return Ok(repair);

    }

}

using API.Dtos.Repair;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/repair")]
[ApiController]
public class RepairController(RepairService repairService) : ControllerBase {

    [HttpGet]
    public async Task<IActionResult> GetAllRepairs() {

        List<Repair> repairs = await repairService.GetAll();

        return Ok(repairs);

    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRepairById([FromRoute] int id) {

        Repair? repair = await repairService.GetRepairById(id);

        if(repair == null) {
            return NotFound();
        }

        return Ok(repair);

    }

    [HttpPost]
    public async Task<IActionResult> CreateRepair([FromBody] CreateRepairBody body) {

        Repair? repair = await repairService.CreateRepair(body.UserId, body.ApartmentId, body.Description, false);

        if(repair == null) {
            return NotFound();
        }

        return Ok(repair);

    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRepair([FromRoute] int id, [FromBody] UpdateRepairBody body) {

        Repair? repair = await repairService.UpdateRepair(id, body.UserId, body.ApartmentId, body.Description, body.IsRepaired);

        if(repair == null) {
            return NotFound();
        }

        return Ok(repair);

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRepair([FromRoute] int id) {

        Repair? repair = await repairService.DeleteRepair(id);

        if(repair == null) {
            return NotFound();
        }

        return Ok(repair);

    }

}
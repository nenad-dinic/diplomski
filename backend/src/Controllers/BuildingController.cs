using API.Dtos.Building;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/building")]
[ApiController]
public class BuildingController(BuildingService buildingService) : ControllerBase {

    [HttpGet]
    public async Task<IActionResult> GetAllBuildings() {

        List<Building> buildings = await buildingService.GetAll();

        return Ok(buildings);

    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBuildingById([FromRoute] int id) {

        Building? building = await buildingService.GetBuildingById(id);

        if(building == null) {
            return NotFound();
        }

        return Ok(building);

    }

    [HttpPost]
    public async Task<IActionResult> CreateBuilding([FromBody] CreateBuildingBody body) {

        Building? building = await buildingService.CreateBuilding(body.ManagerId, body.Address);

        if(building == null) {
            return BadRequest();
        }

        return Ok(building);

    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBuilding([FromRoute] int id, [FromBody] UpdateBuildingBody body) {

        Building? building = await buildingService.UpdateBuilding(id, body.ManagerId, body.Address);

        if(building == null) {
            return BadRequest();
        }

        return Ok(building);

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBuilding([FromRoute] int id) {

        Building? building = await buildingService.DeleteBuilding(id);

        if(building == null) {
            return BadRequest();
        }

        return Ok(building);

    }

}
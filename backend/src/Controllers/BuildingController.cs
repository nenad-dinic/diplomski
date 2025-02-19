using API.Attributes;
using API.Dtos;
using API.Dtos.Building;
using API.Entities;
using API.Services;
using API.Types;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/building")]
[ApiController]
public class BuildingController(BuildingService buildingService) : ControllerBase {

    [HttpGet]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetAllBuildings([FromQuery] PageableQuery query) {

        Page<Building> buildings = await buildingService.GetAll(query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(buildings);

    }

    [HttpGet("{id:int}")]
    [AllowedRoles(Role.Admin, Role.Manager)]
    public async Task<IActionResult> GetBuildingById([FromRoute] int id) {

        Building? building = await buildingService.GetBuildingById(id);

        if(building == null) {
            return NotFound();
        }

        return Ok(building);

    }

    [HttpGet("manager/{managerId:int}")]
    [AllowedRoles(Role.Admin, Role.Manager)]
    public async Task<IActionResult> GetBuildingsByManager([FromRoute] int managerId, [FromQuery] PageableQuery query) {

        Page<Building> buildings = await buildingService.GetBuildingsByManager(managerId, query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(buildings);

    }

    [HttpPost]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> CreateBuilding([FromBody] CreateBuildingBody body) {

        Building? building = await buildingService.CreateBuilding(body.ManagerId, body.Address);

        if(building == null) {
            return BadRequest();
        }

        return Ok(building);

    }

    [HttpPut("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> UpdateBuilding([FromRoute] int id, [FromBody] UpdateBuildingBody body) {

        Building? building = await buildingService.UpdateBuilding(id, body.ManagerId, body.Address);

        if(building == null) {
            return BadRequest();
        }

        return Ok(building);

    }

    [HttpDelete("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> DeleteBuilding([FromRoute] int id) {

        Building? building = await buildingService.DeleteBuilding(id);

        if(building == null) {
            return BadRequest();
        }

        return Ok(building);

    }

}
using API.Attributes;
using API.Dtos;
using API.Dtos.Apartment;
using API.Entities;
using API.Services;
using API.Types;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/apartment")]
[ApiController]
public class ApartmentController(ApartmentService apartmentService) : ControllerBase {

    [HttpGet]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetAllApartments([FromQuery] PageableQuery query) {

        Page<Apartment> apartments = await apartmentService.GetAll(query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(apartments);

    }

    [HttpGet("{id:int}")]
    [AllowedRoles(Role.Admin, Role.Resident)]
    public async Task<IActionResult> GetApartmentById([FromRoute] int id) {

        Apartment? apartment = await apartmentService.GetApartmentById(id);

        if(apartment == null) {
            return NotFound();
        }

        return Ok(apartment);

    }

    [HttpGet("building/{buildingId:int}")]
    [AllowedRoles(Role.Admin, Role.Manager)]
    public async Task<IActionResult> GetApartmentsByBuilding([FromRoute] int buildingId, [FromQuery] PageableQuery query) {

        Page<Apartment> apartments = await apartmentService.GetApartmentsByBuilding(buildingId, query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(apartments);

    }

    [HttpGet("user/{userId:int}")]
    [AllowedRoles(Role.Admin, Role.Resident)]
    public async Task<IActionResult> GetApartmentsByUser([FromRoute] int userId, [FromQuery] PageableQuery query) {

        Page<Apartment> apartments = await apartmentService.GetApartmentsByUser(userId, query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(apartments);

    }

    [HttpPost]
    [AllowedRoles(Role.Admin, Role.Manager)]
    public async Task<IActionResult> CreateApartment([FromBody] CreateApartmentBody body) {

        Apartment? apartment = await apartmentService.CreateApartment(body.BuildingId, body.Number, body.Size, body.NumberOfResidents);

        if(apartment == null) {
            return BadRequest();
        }

        return Ok(apartment);

    }

    [HttpPut("{id:int}")]
    [AllowedRoles(Role.Admin, Role.Manager)]
    public async Task<IActionResult> UpdateApartment([FromRoute] int id, [FromBody] UpdateApartmentBody body) {

        Apartment? apartment = await apartmentService.UpdateApartment(id, body.BuildingId, body.Number, body.Size, body.NumberOfResidents);

        if(apartment == null) {
            return BadRequest();
        }

        return Ok(apartment);

    }

    [HttpDelete("{id:int}")]
    [AllowedRoles(Role.Admin, Role.Manager)]
    public async Task<IActionResult> DeleteApartment([FromRoute] int id) {

        Apartment? apartment = await apartmentService.DeleteApartment(id);

        if(apartment == null) {
            return BadRequest();
        }

        return Ok(apartment);

    }

}
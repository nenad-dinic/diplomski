using API.Attributes;
using API.Dtos;
using API.Dtos.BillType;
using API.Entities;
using API.Services;
using API.Types;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/bill-type")]
[ApiController]
public class BillTypeController(BillTypeService billTypeService) : ControllerBase {

    [HttpGet]
    [AllowedRoles(Role.Admin, Role.Resident)]
    public async Task<IActionResult> GetAllBillTypes([FromQuery] PageableQuery query) {

        Page<BillType> billTypes = await billTypeService.GetAll(query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(billTypes);

    }

    [HttpGet("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetBillTypeById([FromRoute] int id) {

        BillType? billType = await billTypeService.GetBillTypeById(id);

        if(billType == null) {
            return NotFound();
        }

        return Ok(billType);

    }

    [HttpPost]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> CreateBillType([FromBody] CreateBillTypeBody body) {

        BillType? billType = await billTypeService.CreateBillType(body.Name);

        if(billType == null) {
            return BadRequest();
        }

        return Ok(billType);

    }

    [HttpPut("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> UpdateBillType([FromRoute] int id, [FromBody] UpdateBillTypeBody body) {

        BillType? billType = await billTypeService.UpdateBillType(id, body.Name);

        if(billType == null) {
            return BadRequest();
        }

        return Ok(billType);

    }

    [HttpDelete("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> DeleteBillType([FromRoute] int id) {

        BillType? billType = await billTypeService.DeleteBillType(id);

        if(billType == null) {
            return BadRequest();
        }

        return Ok(billType);

    }

}
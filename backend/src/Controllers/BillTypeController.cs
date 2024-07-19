using API.Dtos.BillType;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/bill-type")]
[ApiController]
public class BillTypeController(BillTypeService billTypeService) : ControllerBase {

    [HttpGet]
    public async Task<IActionResult> GetAllBillTypes() {

        List<BillType> billTypes = await billTypeService.GetAll();

        return Ok(billTypes);

    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBillTypeById([FromRoute] int id) {

        BillType? billType = await billTypeService.GetBillTypeById(id);

        if(billType == null) {
            return NotFound();
        }

        return Ok(billType);

    }

    [HttpPost]
    public async Task<IActionResult> CreateBillType([FromBody] CreateBillTypeBody body) {

        BillType? billType = await billTypeService.CreateBillType(body.name);

        if(billType == null) {
            return BadRequest();
        }

        return Ok(billType);

    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBillType([FromRoute] int id, [FromBody] UpdateBillTypeBody body) {

        BillType? billType = await billTypeService.UpdateBillType(id, body.name);

        if(billType == null) {
            return BadRequest();
        }

        return Ok(billType);

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBillType([FromRoute] int id) {

        BillType? billType = await billTypeService.DeleteBillType(id);

        if(billType == null) {
            return BadRequest();
        }

        return Ok(billType);

    }

}
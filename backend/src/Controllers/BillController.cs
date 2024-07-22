using Api.Services;
using API.Dtos;
using API.Dtos.Bill;
using API.Entities;
using API.Services;
using API.Types;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/bill")]
[ApiController]
public class BillController(IConfiguration config, BillService billService, FileService fileService) : ControllerBase {

    [HttpGet]
    public async Task<IActionResult> GetAllBills([FromQuery] PageableQuery query) {

        Page<Bill> bills = await billService.GetAll(query.Filter, query.Page, query.Limit);

        return Ok(bills);

    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetBillById([FromRoute] int id) {

        Bill? bill = await billService.GetBillById(id);

        if(bill == null) {
            return NotFound();
        }

        return Ok(bill);

    }

    [HttpPost]
    public async Task<IActionResult> CreateBill([FromForm] CreateBillBody body) {

        string? publicDirectoryPath = config.GetValue<string>("PublicDirectoryPath");

        if(string.IsNullOrEmpty(publicDirectoryPath)) {
            return StatusCode(500, "Internal Server Error");
        }

        Guid guid = Guid.NewGuid();

        string fileName = body.File.FileName;
        string? extension = body.File.FileName.Split(".").LastOrDefault();
        string filePath = $"/bills/{guid}{(extension != null ? "." + extension : "")}";

        if(!await fileService.WriteFile($"{publicDirectoryPath}{filePath}", body.File.OpenReadStream())) {
            return BadRequest();
        }

        Bill? bill = await billService.CreateBill(body.BillTypeId, body.ApartmentId, body.Month, fileName, filePath);

        if(bill == null) {
            return BadRequest();
        }

        return Ok(bill);

    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateBill([FromRoute] int id, [FromForm] UpdateBillBody body) {

        Bill? bill = await billService.GetBillById(id);

        if(bill == null) {
            return BadRequest();
        }

        string? fileName = null;
        string? filePath = null;

        if(body.File != null) {

            string? publicDirectoryPath = config.GetValue<string>("PublicDirectoryPath");

            if(string.IsNullOrEmpty(publicDirectoryPath)) {
                return StatusCode(500, "Internal Server Error");
            }

            Guid guid = Guid.NewGuid();

            fileName = body.File.FileName;
            string? extension = body.File.FileName.Split(".").LastOrDefault();
            filePath = $"/bills/{guid}{(extension != null ? "." + extension : "")}";

            if(!await fileService.WriteFile($"{publicDirectoryPath}{filePath}", body.File.OpenReadStream())) {
                return BadRequest();
            }
        }

        bill = await billService.UpdateBill(id, body.BillTypeId, body.ApartmentId, body.Month, fileName, filePath);

        if(bill == null) {
            return BadRequest();
        }

        return Ok(bill);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBill([FromRoute] int id) {

        Bill? bill = await billService.DeleteBill(id);

        if(bill == null) {
            return BadRequest();
        }

        return Ok(bill);

    }

}
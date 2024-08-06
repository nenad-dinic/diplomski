using API.Attributes;
using API.Dtos;
using API.Dtos.User;
using API.Entities;
using API.Services;
using API.Types;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/user")]
[ApiController]
public class UserController(UserService userService) : ControllerBase {

    [HttpGet]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetAllUsers([FromQuery] PageableQuery query) {

        Page<User> users = await userService.GetAll(query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(users);

    }

    [HttpGet("managers")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetAllManagers([FromQuery] PageableQuery query) {

        Page<User> users = await userService.GetAllManagers(query.Filter ?? "", query.Page ?? 1, query.Limit ?? 10);

        return Ok(users);

    }

    [HttpGet("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetUserById([FromRoute] int id) {

        User? user = await userService.GetUserById(id);

        if(user == null) {
            return NotFound();
        }

        return Ok(user);

    }

    [HttpPost]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserBody body) {

        User? user = await userService.CreateUser(body.Username, body.Password, body.FullName, body.Email, body.PhoneNumber, body.Role);

        if(user == null) {
            return BadRequest();
        }

        return Ok(user);

    }

    [HttpPut("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> UpdateUser([FromRoute] int id, [FromBody] UpdateUserBody body) {

        User? user = await userService.UpdateUser(id, body.Username, body.Password, body.FullName, body.Email, body.PhoneNumber, body.Role);

        if(user == null) {
            return BadRequest();
        }

        return Ok(user);

    }
    
    [HttpDelete("{id:int}")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> DeleteUser([FromRoute] int id) {

        User? user = await userService.DeleteUser(id);

        if(user == null) {
            return BadRequest();
        }

        return Ok(user);

    }

}
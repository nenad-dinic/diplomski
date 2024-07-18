using API.DTOS;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/user")]
[ApiController]
public class UserController(UserService userService) : ControllerBase {

    [HttpGet]
    public async Task<IActionResult> GetAllUsers() {

        List<User> users = await userService.GetAll();

        return Ok(users);

    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById([FromRoute] int id) {

        User? user = await userService.GetUserByID(id);

        if(user == null) {
            return NotFound();
        }

        return Ok(user);

    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserBody body) {

        User? user = await userService.CreateUser(body.username, body.password, body.fullName, body.email, body.phoneNumber, body.role);

        if(user == null) {
            return BadRequest();
        }

        return Ok(user);

    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser([FromRoute] int id, [FromBody] UpdateUserBody body) {

        User? user = await userService.UpdateUser(id, body.username, body.password, body.fullName, body.email, body.phoneNumber, body.role);

        if(user == null) {
            return BadRequest();
        }

        return Ok(user);

    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser([FromRoute] int id) {

        User? user = await userService.DeleteUser(id);

        if(user == null) {
            return BadRequest();
        }

        return Ok(user);

    }

}
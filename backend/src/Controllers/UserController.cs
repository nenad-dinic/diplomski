using API.DTOS;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/user")]
[ApiController]
public class UserController(UserService userService) : ControllerBase {

    private readonly UserService userService = userService;

    [HttpGet]
    public IActionResult GetAllUsers() {

        List<User> users = userService.GetAll();

        return Ok(users);

    }

    [HttpGet("{id}")]
    public IActionResult GetUserById([FromRoute] int id) {

        User? user = userService.GetUserByID(id);

        if(user == null) {
            return NotFound();
        }

        return Ok(user);

    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] CreateUserBody body) {

        User? user = userService.CreateUser(body.username, body.password, body.fullName, body.email, body.phoneNumber, body.role);

        if(user == null) {
            return BadRequest();
        }

        return Ok(user);

    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser([FromRoute] int id, [FromBody] UpdateUserBody body) {

        User? user = userService.UpdateUser(id, body.username, body.password, body.fullName, body.email, body.phoneNumber, body.role);

        if(user == null) {
            return BadRequest();
        }

        return Ok(user);

    }
    
    [HttpDelete("{id}")]
    public IActionResult DeleteUser([FromRoute] int id) {

        User? user = userService.DeleteUser(id);

        if(user == null) {
            return BadRequest();
        }

        return Ok(user);

    }

}
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/user")]
[ApiController]
public class UserController(UserService userService) : ControllerBase {

    private readonly UserService userService = userService;

    [HttpGet]
    public IActionResult GetAll() {

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

}
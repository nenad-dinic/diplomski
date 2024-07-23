using API.Dtos.Authentication;
using API.Entities;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("auth")]
[ApiController]
public class AuthenticationController(IConfiguration config, UserService userService) : ControllerBase {

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginBody body) {

        string issuer = config.GetValue<string>("JWT:Issuer") ?? "";
        int accessTokenDuration = config.GetValue<int>("JWT:AccessDuration");
        int refreshTokenDuration = config.GetValue<int>("JWT:RefreshDuration");
        string secret = config.GetValue<string>("JWT:Secret") ?? "";

        User? user = await userService.GetUserByUsername(body.Username);

        if(user == null) {
            return BadRequest();
        }

        if(!BCrypt.Net.BCrypt.Verify(body.Password, user.Password)) {
            return BadRequest();
        }

        string accessToken = JsonWebTokenUtils.CreateToken(issuer, user.Id, user.Role.ToString(), "access", DateTime.UtcNow, accessTokenDuration, secret);
        string refreshToken = JsonWebTokenUtils.CreateToken(issuer, user.Id, user.Role.ToString(), "refresh", DateTime.UtcNow, refreshTokenDuration, secret);

        return Ok(new LoginResponse(accessToken, refreshToken));

    }

}
using API.Dtos.Authentication;
using API.Entities;
using API.Services;
using API.Types;
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

        string accessToken = JsonWebTokenUtils.CreateToken(issuer, user.Id, "access", DateTime.UtcNow, user.JTI, accessTokenDuration, secret);
        string refreshToken = JsonWebTokenUtils.CreateToken(issuer, user.Id, "refresh", DateTime.UtcNow, user.JTI, refreshTokenDuration, secret);

        return Ok(new LoginResponse(accessToken, refreshToken));

    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshBody body) {

        string secret = config.GetValue<string>("JWT:Secret") ?? "";
        string issuer = config.GetValue<string>("JWT:Issuer") ?? "";

        JsonWebToken? token = JsonWebTokenUtils.DecodeToken(body.Token, secret);

        if(token == null) {
            return BadRequest();
        }

        if(token.Issuer != issuer) {
            return BadRequest();
        }

        if(token.Type != "refresh") {
            return BadRequest();
        }

        if(token.IssuedAt > DateTime.UtcNow) {
            return BadRequest();
        }

        if(token.ExpiresAt < DateTime.UtcNow) {
            return BadRequest();
        }

        User? user = await userService.GetUserById(token.Subject);

        if(user == null) {
            return BadRequest();
        }

        if(token.JwtId != user.JTI) {
            return BadRequest();
        }

        int accessTokenDuration = config.GetValue<int>("JWT:AccessDuration");
        int refreshTokenDuration = config.GetValue<int>("JWT:RefreshDuration");

        string accessToken = JsonWebTokenUtils.CreateToken(issuer, user.Id, "access", DateTime.UtcNow, user.JTI, accessTokenDuration, secret);
        string refreshToken = JsonWebTokenUtils.CreateToken(issuer, user.Id, "refresh", DateTime.UtcNow, user.JTI, refreshTokenDuration, secret);

        return Ok(new RefreshResponse(accessToken, refreshToken));

    }

}
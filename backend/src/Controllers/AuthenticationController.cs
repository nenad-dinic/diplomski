using API.Attributes;
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

    [HttpGet("identity")]
    [AllowedRoles(Role.Admin, Role.Manager, Role.Resident)]
    public IActionResult GetIdentity() {

        HttpContext.Items.TryGetValue("User", out object? user);

        if(user == null || user.GetType() != typeof(User)) {
            return BadRequest();
        }

        return Ok(user);

    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginBody body) {

        string issuer = config.GetValue<string>("JWT:Issuer") ?? "";
        int accessTokenDuration = config.GetValue<int>("JWT:AccessDuration");
        int refreshTokenDuration = config.GetValue<int>("JWT:RefreshDuration");
        string secret = config.GetValue<string>("JWT:Secret") ?? "";

        User? user = await userService.GetUserByUsernameOrEmail(body.Username);

        if(user == null) {
            return BadRequest();
        }

        if(!BCrypt.Net.BCrypt.Verify(body.Password, user.Password)) {
            return BadRequest();
        }

        string accessToken = JsonWebTokenUtils.CreateAuthToken(issuer, user.Id, "access", user.JTI, accessTokenDuration, secret);
        string refreshToken = JsonWebTokenUtils.CreateAuthToken(issuer, user.Id, "refresh", user.JTI, refreshTokenDuration, secret);

        return Ok(new LoginResponse(accessToken, refreshToken));

    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshBody body) {

        string secret = config.GetValue<string>("JWT:Secret") ?? "";
        string issuer = config.GetValue<string>("JWT:Issuer") ?? "";

        AuthJWT? token = JsonWebTokenUtils.DecodeAuthToken(body.Token, secret);

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

        string accessToken = JsonWebTokenUtils.CreateAuthToken(issuer, user.Id, "access", user.JTI, accessTokenDuration, secret);
        string refreshToken = JsonWebTokenUtils.CreateAuthToken(issuer, user.Id, "refresh", user.JTI, refreshTokenDuration, secret);

        return Ok(new RefreshResponse(accessToken, refreshToken));

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterBody body) {

        Role role = Role.Resident;

        if(body.Token != null) {

            string secret = config.GetValue<string>("JWT:Secret") ?? "";
            InviteJWT? invite = JsonWebTokenUtils.DecodeInviteToken(body.Token, secret);

            if(invite != null) {
                if(invite.Type == "manager") {
                    role = Role.Manager;
                }
            }

        }

        User? user = await userService.CreateUser(body.Username, body.Password, body.FullName, body.Email, body.PhoneNumber, role);

        if(user == null) {
            return BadRequest();
        }

        return Ok(user);

    }

}
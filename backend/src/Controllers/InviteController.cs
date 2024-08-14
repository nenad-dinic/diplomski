using API.Attributes;
using API.Dtos.Invite;
using API.Entities;
using API.Services;
using API.Types;
using API.Utils;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/invite")]
[ApiController]
public class InviteController(IConfiguration config, UserService userService, BuildingService buildingService, MailService mailService) : ControllerBase {

    [HttpPost("manager")]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> InviteManager([FromBody] ManagerInvitationBody body) {

        string issuer = config.GetValue<string>("JWT:Issuer") ?? "";
        string secret = config.GetValue<string>("JWT:Secret") ?? "";
        string inviteUrl = config.GetValue<string>("InviteUrl") ?? "";
        int inviteTokenDuration = config.GetValue<int>("JWT:InviteDuration");

        User? user = await userService.GetUserByEmail(body.Email);

        if(user != null && user.Role != Role.Manager) {
            return BadRequest();
        }

        Building? building = await buildingService.GetBuildingById(body.BuildingId);

        if(building == null) {
            return BadRequest();
        }

        string jwt = JsonWebTokenUtils.CreateInviteToken(issuer, body.Email, "manager", body.BuildingId, building.Address, inviteTokenDuration, secret);

        bool result = await mailService.SendEmail(body.Email, "Invite to be a manager", $"You have been invited to be a manager. Please click the link below to accept the invitation: <br> <a href={inviteUrl}?token={jwt}>Accept</a>");

        if(!result) {
            return BadRequest();
        } else {
            return Ok();
        }

    }

}
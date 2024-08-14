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

    [HttpPost("check")]
    public async Task<IActionResult> CheckInvite([FromBody] CheckInviteBody body) {

        string issuer = config.GetValue<string>("JWT:Issuer") ?? "";
        string secret = config.GetValue<string>("JWT:Secret") ?? "";

        InviteJWT? invite = JsonWebTokenUtils.DecodeInviteToken(body.Token, secret);

        if(invite == null) {
            return BadRequest();
        }

        if(invite.Issuer != issuer) {
            return BadRequest();
        }

        if(invite.IssuedAt > DateTime.UtcNow) {
            return BadRequest();
        }

        if(invite.ExpiresAt < DateTime.UtcNow) {
            return BadRequest();
        }

        User? user = await userService.GetUserByEmail(invite.Subject);

        if(user == null) {
            return BadRequest();
        }

        if(invite.Type == "manager") {

            Building? building = await buildingService.GetBuildingById(invite.Target);

            if(building == null) {
                return BadRequest();
            }

            if(building.ManagerId != null) {
                return BadRequest();
            }

        }

        return Ok(invite);

    }

    [HttpPost("accept")]
    [AllowedRoles(Role.Admin, Role.Manager, Role.Resident)]
    public async Task<IActionResult> AcceptInvite([FromBody] AcceptInvitationBody body) {

        string issuer = config.GetValue<string>("JWT:Issuer") ?? "";
        string secret = config.GetValue<string>("JWT:Secret") ?? "";
    
        InviteJWT? invite = JsonWebTokenUtils.DecodeInviteToken(body.Token, secret);

        if(invite == null) {
            return BadRequest();
        }

        if(invite.Issuer != issuer) {
            return BadRequest();
        }

        if(invite.IssuedAt > DateTime.UtcNow) {
            return BadRequest();
        }

        if(invite.ExpiresAt < DateTime.UtcNow) {
            return BadRequest();
        }

        User? user = await userService.GetUserByEmail(invite.Subject);

        if(user == null) {
            return BadRequest();
        }

        if(invite.Type == "manager") {

            Building? building = await buildingService.GetBuildingById(invite.Target);

            if(building == null) {
                return BadRequest();
            }

            if(building.ManagerId != null) {
                return BadRequest();
            }

            Building? updatedBuilding = await buildingService.UpdateBuilding(building.Id, user.Id, null);

            if(updatedBuilding == null) {
                return BadRequest();
            }

            return Ok(new object{});

        }

        return BadRequest();

    }

}
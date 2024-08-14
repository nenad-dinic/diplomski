using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Invite;

public class AcceptInvitationBody {

    [Required]
    public required string Token { get; set; }

}
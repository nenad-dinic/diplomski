using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Invite;

public class CheckInviteBody {

    [Required]
    public required string Token { get; set; }
}
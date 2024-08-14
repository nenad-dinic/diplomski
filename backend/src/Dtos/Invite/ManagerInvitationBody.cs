using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Invite;

public class ManagerInvitationBody {

    [Required]
    [EmailAddress]
    public required string Email {get; set;}

    [Required]
    [Range(1, int.MaxValue)]
    public required int BuildingId {get; set;}

}
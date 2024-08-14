using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Invite;

public class OwnerInvitationBody {

    [Required]
    [EmailAddress]
    public required string Email {get; set;}

    [Required]
    [Range(1, int.MaxValue)]
    public required int ApartmentId {get; set;}

}
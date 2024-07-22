using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Resident;

public class CreateResidentBody {

    [Required]
    [Range(1, int.MaxValue)]
    public required int UserId {get; set;}

    [Required]
    [Range(1, int.MaxValue)]
    public required int ApartmentId {get; set;}

    [Required]
    public required DateOnly Expires {get; set;}

    [Required]
    public required bool IsOwner {get; set;}

}
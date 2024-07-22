using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Repair;

public class CreateRepairBody {

    [Required]
    [Range(1, int.MaxValue)]
    public required int UserId {get; set;}

    [Required]
    [Range(1, int.MaxValue)]
    public required int ApartmentId {get; set;}

    [Required]
    [MinLength(1)]
    public required string Description {get; set;}

}
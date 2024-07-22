using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Building;

public class CreateBuildingBody {

    [Required]
    [Range(1, int.MaxValue)]
    public required int ManagerId {get; set;}

    [Required]
    [Length(1, 100)]
    public required string Address {get; set;}

}
using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Building;

public class CreateBuildingBody {

    [Range(1, int.MaxValue)]
    public int? ManagerId {get; set;}

    [Required]
    [Length(1, 100)]
    public required string Address {get; set;}

}
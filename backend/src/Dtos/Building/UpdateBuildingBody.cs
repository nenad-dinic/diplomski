using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Building;

public class UpdateBuildingBody {

    [Range(1, int.MaxValue)]
    public int? ManagerId {get; set;}

    [Length(1, 100)]
    public string? Address {get; set;}

}
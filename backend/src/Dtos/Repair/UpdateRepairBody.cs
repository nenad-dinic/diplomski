using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Repair;

public class UpdateRepairBody {

    [Range(1, int.MaxValue)]
    public int? UserId {get; set;}

    [Range(1, int.MaxValue)]
    public int? ApartmentId {get; set;}

    [MinLength(1)]
    public string? Description {get; set;}

    public bool? IsRepaired {get; set;}

}
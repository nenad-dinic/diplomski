using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Resident;

public class UpdateResidentBody {

    [Range(1, int.MaxValue)]
    public int? UserId {get; set;}

    [Range(1, int.MaxValue)]
    public int? ApartmentId {get; set;}

    public DateOnly? Expires {get; set;}

    public bool? IsOwner {get; set;}

}
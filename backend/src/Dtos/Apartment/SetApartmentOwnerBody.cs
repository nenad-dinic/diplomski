using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Apartment;

public class SetApartmentOwnerBody {

    [Required]
    [Range(1, int.MaxValue)]
    public required int ApartmentId {get; set;}

    [Required]
    [Range(1, int.MaxValue)]
    public required int UserId {get; set;}

}
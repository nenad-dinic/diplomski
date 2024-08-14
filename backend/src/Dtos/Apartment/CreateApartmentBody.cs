using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Apartment;

public class CreateApartmentBody {

    [Required]
    [Range(1, int.MaxValue)]
    public required int BuildingId {get; set;}

    [Required]
    [Range(1, int.MaxValue)]
    public required int Number {get; set;}

    [Required]
    [Range(1, int.MaxValue)]
    public required int Size {get; set;}

    [Required]
    [Range(0, int.MaxValue)]
    public required int NumberOfResidents {get; set;}

}
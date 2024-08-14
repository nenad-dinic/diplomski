using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Apartment;

public class UpdateApartmentBody {

    [Range(1, int.MaxValue)]
    public int? BuildingId {get; set;}

    [Range(1, int.MaxValue)]
    public int? Number {get; set;}

    [Range(1, int.MaxValue)]
    public int? Size {get; set;}

    [Range(0, int.MaxValue)]
    public int? NumberOfResidents {get; set;}

}
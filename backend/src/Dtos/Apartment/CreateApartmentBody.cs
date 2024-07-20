namespace API.Dtos.Apartment;

public class CreateApartmentBody {

    public int BuildingId {get; set;}
    public int Number {get; set;}
    public int Size {get; set;}
    public int NumberOfResidents {get; set;}

}
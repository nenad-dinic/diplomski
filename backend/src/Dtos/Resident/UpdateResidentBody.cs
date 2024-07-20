namespace API.Dtos.Resident;

public class UpdateResidentBody {

    public int? UserId {get; set;}
    public int? ApartmentId {get; set;}
    public DateOnly? Expires {get; set;}
    public bool? IsOwner {get; set;}

}
namespace API.Dtos.Repair;

public class CreateRepairBody {

    public int UserId {get; set;}
    public int ApartmentId {get; set;}
    public string Description {get; set;} = string.Empty;

}
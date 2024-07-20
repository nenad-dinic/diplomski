namespace API.Dtos.Repair;

public class UpdateRepairBody {

    public int? UserId {get; set;}
    public int? ApartmentId {get; set;}
    public string? Description {get; set;}
    public bool? IsRepaired {get; set;}

}
namespace API.Dtos.Meeting;

public class UpdateMeetingBody {

    public int? BuildingId {get; set;}
    public DateTime? DateTime {get; set;}
    public int? Length {get; set;}
    public string? Description {get; set;}

}
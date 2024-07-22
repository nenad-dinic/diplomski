using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Meeting;

public class UpdateMeetingBody {

    [Range(1, int.MaxValue)]
    public int? BuildingId {get; set;}
    
    public DateTime? DateTime {get; set;}

    [Range(1, int.MaxValue)]
    public int? Length {get; set;}

    [MinLength(1)]
    public string? Description {get; set;}

}
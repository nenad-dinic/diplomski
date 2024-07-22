using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Meeting;

public class CreateMeetingBody {

    [Required]
    [Range(1, int.MaxValue)]
    public required int BuildingId {get; set;}

    [Required]
    public required DateTime DateTime {get; set;}

    [Required]
    [Range(1, int.MaxValue)]
    public required int Length {get; set;}

    [Required]
    [MinLength(1)]
    public required string Description {get; set;}

}
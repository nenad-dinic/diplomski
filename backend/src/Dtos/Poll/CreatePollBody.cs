using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Poll;

public class CreatePollBody {

    [Required]
    [Range(1, int.MaxValue)]
    public required int BuildingId {get; set;}

    [Required]
    [Length(1, 100)]
    public required string Title {get; set;}

}
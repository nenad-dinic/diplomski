using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Poll;

public class UpdatePollBody {

    [Range(1, int.MaxValue)]
    public int? BuildingId {get; set;}

    [Length(1, 100)]
    public string? Title {get; set;}

    public bool? IsActive {get; set;}

}
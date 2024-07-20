namespace API.Dtos.Poll;

public class UpdatePollBody {

    public int? BuildingId {get; set;}
    public string? Title {get; set;}
    public bool? IsActive {get; set;}

}
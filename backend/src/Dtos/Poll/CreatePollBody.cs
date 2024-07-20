namespace API.Dtos.Poll;

public class CreatePollBody {

    public int BuildingId {get; set;}
    public string Title {get; set;} = string.Empty;
    public bool IsActive {get; set;} = true;

}
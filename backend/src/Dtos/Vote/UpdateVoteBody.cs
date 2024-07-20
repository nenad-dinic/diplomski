namespace API.Dtos.Vote;

public class UpdateVoteBody {

    public int? UserId {get; set;}
    public int? PollId {get; set;}
    public bool? Result {get; set;}

}
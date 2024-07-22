using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Vote;

public class UpdateVoteBody {

    [Range(1, int.MaxValue)]
    public int? UserId {get; set;}

    [Range(1, int.MaxValue)]
    public int? PollId {get; set;}

    public bool? Result {get; set;}

}
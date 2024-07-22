using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Vote;

public class CreateVoteBody {

    [Required]
    [Range(1, int.MaxValue)]
    public required int UserId {get; set;}

    [Required]
    [Range(1, int.MaxValue)]
    public required int PollId {get; set;}

    public required bool Result {get; set;}

}
using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Authentication;

public class RefreshBody {

    [Required(AllowEmptyStrings = true)]
    public required string Token {get; set;}

}
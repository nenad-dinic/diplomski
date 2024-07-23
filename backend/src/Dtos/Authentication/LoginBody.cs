using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Authentication;

public class LoginBody {

    [Required(AllowEmptyStrings = true)]
    public required string Username {get; set;}

    [Required(AllowEmptyStrings = true)]
    public required string Password {get; set;}

}
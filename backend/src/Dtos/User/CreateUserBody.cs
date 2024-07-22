using System.ComponentModel.DataAnnotations;
using API.Types;

namespace API.Dtos.User;

public class CreateUserBody {

    [Required]
    [Length(1, 50)]
    public required string Username {get; set;}

    [Required]
    [MinLength(8)]
    public required string Password {get; set;}

    [Required]
    [Length(1,100)]
    public required string FullName {get; set;}

    [Required]
    [EmailAddress]
    [Length(1, 320)]
    public required string Email {get; set;}

    [Required]
    [Phone]
    [Length(1, 20)]
    public required string PhoneNumber {get; set;}

    [Required]
    [EnumDataType(typeof(Role))]
    public required Role Role {get; set;}
}
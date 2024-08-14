using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Authentication;

public class RegisterBody {

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

    public string? Token {get; set;}

}
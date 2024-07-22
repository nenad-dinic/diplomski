using System.ComponentModel.DataAnnotations;
using API.Types;

namespace API.Dtos.User;

public class UpdateUserBody {

    [Length(1, 50)]
    public string? Username {get; set;} = null;

    [MinLength(8)]
    public string? Password {get; set;} = null;

    [Length(1,100)]
    public string? FullName {get; set;} = null;

    [EmailAddress]
    [Length(1, 320)]
    public string? Email {get; set;} = null;

    [Phone]
    [Length(1, 20)]
    public string? PhoneNumber {get; set;} = null;

    [EnumDataType(typeof(Role))]
    public Role? Role {get; set;} = null;
}
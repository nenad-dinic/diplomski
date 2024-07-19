using API.Types;

namespace API.Dtos.User;

public class UpdateUserBody {
    public string? Username {get; set;} = null;
    public string? Password {get; set;} = null;
    public string? FullName {get; set;} = null;
    public string? Email {get; set;} = null;
    public string? PhoneNumber {get; set;} = null;
    public Role? Role {get; set;} = null;
}
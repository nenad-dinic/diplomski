using API.Types;

namespace API.Dtos.User;

public class UpdateUserBody {
    public string? username {get; set;} = null;
    public string? password {get; set;} = null;
    public string? fullName {get; set;} = null;
    public string? email {get; set;} = null;
    public string? phoneNumber {get; set;} = null;
    public Role? role {get; set;} = null;
}
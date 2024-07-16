using API.Types;

namespace API.DTOS;

public class CreateUserBody {

    public string username {get; set;} = string.Empty;
    public string password {get; set;} = string.Empty;
    public string fullName {get; set;} = string.Empty;
    public string email {get; set;} = string.Empty;
    public string phoneNumber {get; set;} = string.Empty;
    public Role role {get; set;} = Role.Resident;
}

public class UpdateUserBody {
    public string? username {get; set;} = null;
    public string? password {get; set;} = null;
    public string? fullName {get; set;} = null;
    public string? email {get; set;} = null;
    public string? phoneNumber {get; set;} = null;
    public Role? role {get; set;} = null;
}
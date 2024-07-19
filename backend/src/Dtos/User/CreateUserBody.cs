using API.Types;

namespace API.Dtos.User;

public class CreateUserBody {

    public string Username {get; set;} = string.Empty;
    public string Password {get; set;} = string.Empty;
    public string FullName {get; set;} = string.Empty;
    public string Email {get; set;} = string.Empty;
    public string PhoneNumber {get; set;} = string.Empty;
    public Role Role {get; set;} = Role.Resident;
}
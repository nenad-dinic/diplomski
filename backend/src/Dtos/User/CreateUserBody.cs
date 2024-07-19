using API.Types;

namespace API.Dtos.User;

public class CreateUserBody {

    public string username {get; set;} = string.Empty;
    public string password {get; set;} = string.Empty;
    public string fullName {get; set;} = string.Empty;
    public string email {get; set;} = string.Empty;
    public string phoneNumber {get; set;} = string.Empty;
    public Role role {get; set;} = Role.Resident;
}
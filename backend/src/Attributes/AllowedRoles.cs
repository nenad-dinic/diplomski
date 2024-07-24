using API.Types;

namespace API.Attributes;

[AttributeUsage(AttributeTargets.Method)]
public class AllowedRoles(params Role[] roles) : Attribute
{

    private readonly Role[] Roles = roles;

    public bool IsAllowed(Role role) {

        if(Roles.Contains(role)) {
            return true;
        }

        return false;

    }

}
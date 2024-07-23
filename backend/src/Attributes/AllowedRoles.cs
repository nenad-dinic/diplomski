using API.Types;

namespace API.Attributes;

[AttributeUsage(AttributeTargets.Method)]
public class AllowedRoles(params Role[] roles) : Attribute
{

    readonly Role[] Roles = roles;

    public bool IsAllowed(Role role) {

        if(Roles.Contains(role)) {
            return true;
        }

        return false;

    }

}
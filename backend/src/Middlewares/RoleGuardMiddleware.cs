using API.Attributes;
using API.Entities;

namespace API.Middlewares;

public class RoleGuardMiddleware : MiddlewareBase {

    public override async Task InvokeAsync(HttpContext context, RequestDelegate next) {

        AllowedRoles? allowedRoles = context.GetEndpoint()?.Metadata.GetMetadata<AllowedRoles>();

        if(allowedRoles == null) {
            await next.Invoke(context);
            return;
        }

        User? user = (User?)context.Items["User"];

        if(user == null) {
            await SendHttpStatus(context, 403, "Forbidden");
            return;
        }

        if(!allowedRoles.IsAllowed(user.Role)) {
            await SendHttpStatus(context, 403, "Forbidden");
            return;
        }

        await next.Invoke(context);
    }
}
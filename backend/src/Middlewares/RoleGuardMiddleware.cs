using API.Attributes;
using API.Entities;

namespace API.Middlewares;

public class RoleGuardMiddleware {

    public static Func<HttpContext, RequestDelegate, Task> Apply() {

        return async (context, next) => {

            HttpRequest request = context.Request;
            HttpResponse response = context.Response;

            AllowedRoles? allowedRoles = context.GetEndpoint()?.Metadata.GetMetadata<AllowedRoles>();

            if(allowedRoles == null) {
                await next.Invoke(context);
                return;
            }

            User? user = (User?)context.Items["User"];

            if(user == null) {
                response.StatusCode = 403;
                return;
            }

            if(!allowedRoles.IsAllowed(user.Role)) {
                response.StatusCode = 403;
                return;
            }

            await next.Invoke(context);

        };

    }

}
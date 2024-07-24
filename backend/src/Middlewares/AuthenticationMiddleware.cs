using API.Entities;
using API.Services;
using API.Types;
using API.Utils;
using DotNet.Globbing;

namespace API.Middlewares;

public class AuthenticationMiddleware {

    public static Func<HttpContext, RequestDelegate, Task> Apply(List<ExcludeRoute> excludeRoutes) {

        return async (context, next) => {

            HttpRequest request = context.Request;
            HttpResponse response = context.Response;
            IServiceProvider provider = context.RequestServices;

            UserService userService = provider.GetRequiredService<UserService>();
            IConfiguration config = provider.GetRequiredService<IConfiguration>();

            string secret = config.GetValue<string>("JWT:Secret") ?? "";
            string issuer = config.GetValue<string>("JWT:Issuer") ?? "";

            if(excludeRoutes.Exists(r => Glob.Parse(r.Method).IsMatch(request.Method) && Glob.Parse(r.Path).IsMatch(request.Path))) {
                await next.Invoke(context);
                return;
            }

            string authHeader = request.Headers.Authorization.ToString();
            string[] parts = authHeader.Split(' ');

            if(parts.Length != 2) {
                response.StatusCode = 401;
                return;
            }

            Dictionary<string, object> token;
            try {
                token = JsonWebTokenUtils.DecodeToken(parts[1], secret);
            } catch {
                response.StatusCode = 401;
                return;
            }

            if((string)token["iss"] != issuer) {
                response.StatusCode = 401;
                return;
            }

            if((string)token["typ"] != "access") {
                response.StatusCode = 401;
                return;
            }

            if(decimal.ToInt64((decimal)token["iat"]) > DateTimeOffset.UtcNow.ToUnixTimeSeconds()) {
                response.StatusCode = 401;
                return;
            }

            if(decimal.ToInt64((decimal)token["exp"]) < DateTimeOffset.UtcNow.ToUnixTimeSeconds()) {
                response.StatusCode = 401;
                return;
            }

            User? user = await userService.GetUserById(decimal.ToInt32((decimal)token["sub"]));

            if(user == null) {
                response.StatusCode = 401;
                return;
            }

            context.Items.Add("User", user);

            await next.Invoke(context);
        };

    }

}
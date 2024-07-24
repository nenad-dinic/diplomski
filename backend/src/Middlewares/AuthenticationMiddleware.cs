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

            JsonWebToken? token = JsonWebTokenUtils.DecodeToken(parts[1], secret);
            
            if(token == null) {
                response.StatusCode = 401;
                return;
            }

            if(token.Issuer != issuer) {
                response.StatusCode = 401;
                return;
            }

            if(token.Type != "access") {
                response.StatusCode = 401;
                return;
            }

            if(token.IssuedAt > DateTime.UtcNow) {
                response.StatusCode = 401;
                return;
            }

            if(token.ExpiresAt < DateTime.UtcNow) {
                response.StatusCode = 401;
                return;
            }

            User? user = await userService.GetUserById(token.Subject);

            if(user == null) {
                response.StatusCode = 401;
                return;
            }

            if(token.JwtId != user.JTI) {
                response.StatusCode = 401;
                return;
            }

            context.Items.Add("User", user);

            await next.Invoke(context);
        };

    }

}
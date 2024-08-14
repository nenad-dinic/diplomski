using API.Entities;
using API.Services;
using API.Types;
using API.Utils;
using DotNet.Globbing;

namespace API.Middlewares;

public class AuthenticationMiddleware(List<ExcludeRoute> excludeRoutes) : MiddlewareBase {

    public override async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        HttpRequest request = context.Request;
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
            await SendHttpStatus(context, 401, "Unauthorized");
            return;
        }

        AuthJWT? token = JsonWebTokenUtils.DecodeAuthToken(parts[1], secret);
        
        if(token == null) {
            await SendHttpStatus(context, 401, "Unauthorized");
            return;
        }

        if(token.Issuer != issuer) {
            await SendHttpStatus(context, 401, "Unauthorized");
            return;
        }

        if(token.Type != "access") {
            await SendHttpStatus(context, 401, "Unauthorized");
            return;
        }

        if(token.IssuedAt > DateTime.UtcNow) {
            await SendHttpStatus(context, 401, "Unauthorized");
            return;
        }

        if(token.ExpiresAt < DateTime.UtcNow) {
            await SendHttpStatus(context, 401, "Unauthorized");
            return;
        }

        User? user = await userService.GetUserById(token.Subject);

        if(user == null) {
            await SendHttpStatus(context, 401, "Unauthorized");
            return;
        }

        if(token.JwtId != user.JTI) {
            await SendHttpStatus(context, 401, "Unauthorized");
            return;
        }

        context.Items.Add("User", user);

        await next.Invoke(context);

    }
}
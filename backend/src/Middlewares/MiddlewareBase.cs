
namespace API.Middlewares;

public abstract class MiddlewareBase : IMiddleware
{

    public async Task SendHttpStatus(HttpContext context, int statusCode, string title) {
        HttpResponse response = context.Response;
        response.StatusCode = statusCode;
        await response.WriteAsJsonAsync(new {
            Status = statusCode,
            Title = title
        });
    }

    public abstract Task InvokeAsync(HttpContext context, RequestDelegate next);
}
using API.Attributes;
using API.Services;
using API.Types;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/analytics")]
[ApiController]
public class AnalyticsController(AnalyticsService analyticsService) : ControllerBase {

    [HttpGet]
    [AllowedRoles(Role.Admin)]
    public async Task<IActionResult> GetAnalytics() {

        Analytics analytics = await analyticsService.GetAnalytics();

        return Ok(analytics);

    }

}
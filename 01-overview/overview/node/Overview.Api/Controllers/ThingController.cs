using Microsoft.AspNetCore.Mvc;
using Overview.Models;
using Overview.Services;

namespace Overview.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ThingController(ThingService svc) : ControllerBase
{
    readonly ThingService svc = svc;

    [HttpGet("[action]")]
    public async Task<ActionResult<List<Thing>>> GetThings() =>
        Ok(await svc.GetThings());

    [HttpGet("[action]/{id:int}")]
    public async Task<ActionResult<Thing?>> GetThing(
        [FromRoute] int id
    ) => Ok(await svc.GetThing(id));

    [HttpPost("[action]")]
    public async Task<ActionResult<bool>> ValidateName(
        [FromBody] Thing thing
    ) => Ok(await svc.ValidateName(thing));

    [HttpPost("[action]")]
    public async Task<ActionResult<bool>> Validate(
        [FromBody] Thing thing
    ) => Ok(await svc.Validate(thing));

    [HttpPost("[action]")]
    public async Task<ActionResult<Thing?>> Save(
        [FromBody] Thing thing
    ) => Ok(await svc.Save(thing));

    [HttpDelete("[action]/{id:int}")]
    public async Task<ActionResult<int>> Remove(
        [FromRoute] int id
    ) => Ok(await svc.Remove(id));
}
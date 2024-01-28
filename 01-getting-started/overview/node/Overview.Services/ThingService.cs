using Microsoft.EntityFrameworkCore;
using Overview.Data;
using Overview.Models;

namespace Overview.Services;

public class ThingService(AppDbContext db)
{
    readonly AppDbContext db = db;

    public async Task<List<Thing>> GetThings() =>
        await db.Things.ToListAsync();

    public async Task<Thing?> GetThing(int id) =>
        await db.Things.FindAsync(id);

    public async Task<bool> ValidateName(Thing thing) =>
        !await db.Things.AnyAsync(x =>
            x.Id != thing.Id
            && x.Name.ToLower() == thing.Name.ToLower()
        );

    public async Task<bool> Validate(Thing thing)
    {
        bool valid = true;

        if (string.IsNullOrWhiteSpace(thing.Name))
            valid = false;

        if (!await ValidateName(thing))
            valid = false;

        return valid;
    }

    public async Task<Thing?> Save(Thing thing)
    {
        if (await Validate(thing))
        {
            int result = thing.Id > 0
                ? await Update(thing)
                : await Add(thing);

            return result > 0
                ? thing
                : null;
        }
        else
            throw new Exception($"Save: Thing {thing.Id} - {thing.Name} is invalid");
    }

    public async Task<int> Remove(int id)
    {
        Thing? thing = await GetThing(id);

        if (thing is null)
            return 0;

        db.Things.Remove(thing);
        return await db.SaveChangesAsync();
    }

    async Task<int> Add(Thing thing)
    {
        await db.Things.AddAsync(thing);
        return await db.SaveChangesAsync();
    }

    async Task<int> Update(Thing thing)
    {
        db.Things.Update(thing);
        return await db.SaveChangesAsync();
    }
}

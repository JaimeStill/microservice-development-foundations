using Microsoft.EntityFrameworkCore;
using Overview.Models;

namespace Overview.Data;
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Thing> Things => Set<Thing>();
}
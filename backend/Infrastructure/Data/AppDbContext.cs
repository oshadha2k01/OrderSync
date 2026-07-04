using Microsoft.EntityFrameworkCore;
using SalesAPI.Domain.Entities;

namespace SalesAPI.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Client> Client { get; set; }
        public DbSet<Item> Item { get; set; }
        public DbSet<SalesOrder> SalesOrder { get; set; }
        public DbSet<SalesOrderItem> SalesOrderItem { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Ensures EF Core knows about the relationship
            modelBuilder.Entity<SalesOrder>()
                .HasMany(o => o.Items)
                .WithOne()
                .HasForeignKey(i => i.SalesOrderId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

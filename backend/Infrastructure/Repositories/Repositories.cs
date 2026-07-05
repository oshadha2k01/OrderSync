using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SalesAPI.Application.Interfaces;
using SalesAPI.Domain.Entities;
using SalesAPI.Infrastructure.Data;

namespace SalesAPI.Infrastructure.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly AppDbContext _context;
        public ClientRepository(AppDbContext context) => _context = context;
        public async Task<IEnumerable<Client>> GetAllAsync() => await _context.Client.ToListAsync();
    }

    public class ItemRepository : IItemRepository
    {
        private readonly AppDbContext _context;
        public ItemRepository(AppDbContext context) => _context = context;
        public async Task<IEnumerable<Item>> GetAllAsync() => await _context.Item.ToListAsync();
    }

    public class SalesOrderRepository : ISalesOrderRepository
    {
        private readonly AppDbContext _context;
        public SalesOrderRepository(AppDbContext context) => _context = context;
        
        public async Task<IEnumerable<SalesOrder>> GetAllOrdersAsync()
        {
            return await _context.SalesOrder.Include(o => o.Items).ToListAsync();
        }

        public async Task AddOrderAsync(SalesOrder order)
        {
            await _context.SalesOrder.AddAsync(order);
        }

        public async Task<SalesOrder?> GetOrderByIdAsync(int id)
        {
            return await _context.SalesOrder.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id);
        }
    }

    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        public UnitOfWork(AppDbContext context) => _context = context;
        public async Task<int> SaveChangesAsync() => await _context.SaveChangesAsync();
    }
}

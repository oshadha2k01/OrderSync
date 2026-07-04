using System.Collections.Generic;
using System.Threading.Tasks;
using SalesAPI.Domain.Entities;

namespace SalesAPI.Application.Interfaces
{
    public interface IClientRepository
    {
        Task<IEnumerable<Client>> GetAllAsync();
    }

    public interface IItemRepository
    {
        Task<IEnumerable<Item>> GetAllAsync();
    }

    public interface ISalesOrderRepository
    {
        Task<IEnumerable<SalesOrder>> GetAllOrdersAsync();
        Task AddOrderAsync(SalesOrder order);
    }
}

using System.Threading.Tasks;

namespace SalesAPI.Application.Interfaces
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();
    }
}

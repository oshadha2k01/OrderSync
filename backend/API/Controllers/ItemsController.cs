using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SalesAPI.Application.Interfaces;

namespace SalesAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemRepository _itemRepo;
        public ItemsController(IItemRepository itemRepo) => _itemRepo = itemRepo;

        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items = await _itemRepo.GetAllAsync();
            return Ok(items);
        }
    }
}

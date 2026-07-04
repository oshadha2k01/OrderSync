using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SalesAPI.Application.Interfaces;

namespace SalesAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientRepository _clientRepo;
        public ClientsController(IClientRepository clientRepo) => _clientRepo = clientRepo;

        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _clientRepo.GetAllAsync();
            return Ok(clients);
        }
    }
}

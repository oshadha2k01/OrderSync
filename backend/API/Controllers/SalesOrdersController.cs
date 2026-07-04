using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SalesAPI.Application.Interfaces;
using SalesAPI.Domain.Entities;
using SalesAPI.Models;

namespace SalesAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesOrdersController : ControllerBase
    {
        private readonly ISalesOrderRepository _orderRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SalesOrdersController(ISalesOrderRepository orderRepo, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _orderRepo = orderRepo;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _orderRepo.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateSalesOrderDto orderDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Use AutoMapper to convert DTO to Domain Entity
            var salesOrder = _mapper.Map<SalesOrder>(orderDto);

            await _orderRepo.AddOrderAsync(salesOrder);
            await _unitOfWork.SaveChangesAsync();

            return Ok(new { message = "Order saved successfully", orderId = salesOrder.Id });
        }
    }
}

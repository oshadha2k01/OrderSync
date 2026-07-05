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

            var salesOrder = _mapper.Map<SalesOrder>(orderDto);

            await _orderRepo.AddOrderAsync(salesOrder);
            await _unitOfWork.SaveChangesAsync();

            return Ok(new { message = "Order saved successfully", orderId = salesOrder.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] CreateSalesOrderDto orderDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var existingOrder = await _orderRepo.GetOrderByIdAsync(id);
            if (existingOrder == null) return NotFound(new { message = $"Order with ID {id} not found" });

            existingOrder.InvoiceNo = orderDto.InvoiceNo;
            existingOrder.InvoiceDate = orderDto.InvoiceDate;
            existingOrder.ReferenceNo = orderDto.ReferenceNo;
            existingOrder.Note = orderDto.Note;
            existingOrder.ClientId = orderDto.ClientId;
            existingOrder.CustomerName = orderDto.CustomerName;
            existingOrder.Address1 = orderDto.Address1;
            existingOrder.Address2 = orderDto.Address2;
            existingOrder.Address3 = orderDto.Address3;
            existingOrder.Suburb = orderDto.Suburb;
            existingOrder.State = orderDto.State;
            existingOrder.PostCode = orderDto.PostCode;
            existingOrder.TotalExcl = orderDto.TotalExcl;
            existingOrder.TotalTax = orderDto.TotalTax;
            existingOrder.TotalIncl = orderDto.TotalIncl;

            existingOrder.Items.Clear();
            foreach (var itemDto in orderDto.Items)
            {
                existingOrder.Items.Add(new SalesOrderItem
                {
                    ItemCode = itemDto.ItemCode,
                    Description = itemDto.Description,
                    Note = itemDto.Note,
                    Quantity = itemDto.Quantity,
                    Price = itemDto.Price,
                    TaxRate = itemDto.TaxRate,
                    ExclAmount = itemDto.ExclAmount,
                    TaxAmount = itemDto.TaxAmount,
                    InclAmount = itemDto.InclAmount
                });
            }

            await _unitOfWork.SaveChangesAsync();

            return Ok(new { message = "Order updated successfully", orderId = existingOrder.Id });
        }
    }
}

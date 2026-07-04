using AutoMapper;
using SalesAPI.Domain.Entities;
using SalesAPI.Models;

namespace SalesAPI.Application.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateSalesOrderDto, SalesOrder>();
            CreateMap<CreateSalesOrderItemDto, SalesOrderItem>();
        }
    }
}

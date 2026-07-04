using Microsoft.EntityFrameworkCore;
using SalesAPI.Application.Interfaces;
using SalesAPI.Application.Services;
using SalesAPI.Infrastructure.Data;
using SalesAPI.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Entity Framework Core with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure AutoMapper
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());

// Dependency Injection Setup (Interfaces to Implementations)
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<ISalesOrderRepository, SalesOrderRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Configure CORS for React frontend (assuming React runs on port 3000 or 5173)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp"); // Enable CORS
app.UseAuthorization();
app.MapControllers();
app.Run();

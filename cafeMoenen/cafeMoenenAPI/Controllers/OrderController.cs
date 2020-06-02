using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using cafeMoenenAPI.Dtos;
using cafeMoenenAPI.Models;
using cafeMoenenAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cafeMoenenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        private readonly BeverageService _beverageService;
        private readonly TableService _tableService;

        public OrderController(OrderService orderService, BeverageService beverageService, TableService tableService)
        {
            _orderService = orderService;
            _beverageService = beverageService;
            _tableService = tableService;
        }

        // GET
        // Get all beverages
        [HttpGet]
        [Route("beverages")]
        public ActionResult<List<Beverage>> GetBeverages() => _beverageService.Get();

        // GET
        // Get all order from Db
        [HttpGet]
        public ActionResult<List<Order>> Get() => _orderService.Get();

        //GET
        // Get all orders by reservation id
        [HttpGet("{id:length(24)}", Name = "GetByReservationId")]
        public ActionResult<List<OrderDto>> Get(string id)
        {
            var orders = _orderService.ByReservation(id);

            if (orders == null || !orders.Any())
            {
                return NotFound();
            }

            return (from order in orders let beverages = order.BeverageIds.Select(beverageId => _beverageService.Get(beverageId)).ToList() select new OrderDto {Beverages = beverages, Cost = order.OrderCost, Table = _tableService.Get(order.TableId)}).ToList();
        }

        //POST
        // Post a new order to the db
        [HttpPost]
        public ActionResult<Order> Create([FromBody] Order order)
        {
            if (order == null) return NotFound();

            _orderService.Create(order);

            return Ok();
        }
    }
}
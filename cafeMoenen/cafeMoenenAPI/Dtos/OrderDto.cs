using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeMoenenAPI.Models;

namespace cafeMoenenAPI.Dtos
{
    public class OrderDto
    {
        public List<Beverage> Beverages { get; set; }
        public Table Table  { get; set; }
        public decimal Cost { get; set; }
    }
}

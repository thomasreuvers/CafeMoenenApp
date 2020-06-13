using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeMoenenAPI.Models;
using cafeMoenenAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cafeMoenenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly TableService _tableService;

        public TableController(TableService tableService)
        {
            _tableService = tableService;
        }

        // GET
        // Get table by specified table id else return 404 response
        [HttpGet("{id:length(24)}", Name = "GetTable")]
        public ActionResult<Table> Get(string id)
        {
            var table = _tableService.Get(id);
            if (table == null)
            {
                return NotFound();
            }

            return table;
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using cafeMoenenAPI.Models;
using cafeMoenenAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cafeMoenenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationService _reservationService;
        private readonly TableService _tableService;

        public ReservationController(ReservationService reservationService, TableService tableService)
        {
            _reservationService = reservationService;
            _tableService = tableService;
        }

        // GET
        // Get all reservations from Db
        [HttpGet]
        public ActionResult<List<Reservation>> Get() => _reservationService.Get();

        // POST
        // Create a reservation
        [HttpPost]
        public ActionResult<Reservation> Create([FromBody]Reservation reservation)
        {
            if (reservation == null) return NotFound("Reservering is null");

            var amountOfTables = (int)Math.Ceiling((double)reservation.Guests / 6);
            var tables = _tableService.Get().Where(x => x.IsAvailable && x.Setting == reservation.Setting)
                .Take(amountOfTables).ToList();
            
            if (tables.Count <= 0 || !tables.Any()) return NotFound("Er zijn geen tafels beschikbaar voor deze reservering!");
            
            foreach (var table in tables)
            {
                table.IsAvailable = false;
                _tableService.Update(table);
            }
            
            reservation.TableIds = new List<string>();
            reservation.TableIds.AddRange(tables.Select(x => x.Id).ToList());
            
            _reservationService.Create(reservation);

            return Ok(reservation);
        }
    }
}
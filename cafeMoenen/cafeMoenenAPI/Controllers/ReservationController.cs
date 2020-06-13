using System;
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

            reservation.ReservationArrival = reservation.ReservationArrival.ToLocalTime();
            reservation.ReservationDepature = reservation.ReservationArrival.AddHours(1.0).ToLocalTime();
            
            _reservationService.Create(reservation);

            return Ok(reservation);
        }

        // DELETE
        // Delete a given reservation
        [HttpDelete("{id:length(24)}")]
        public ActionResult<string> Delete(string id)
        {
            if (id == null || string.IsNullOrEmpty(id)) return NotFound();

            var reservation = _reservationService.Get(id);

            if (reservation == null) return NotFound();

            var tables = reservation.TableIds.Select(tableId => _tableService.Get(tableId)).ToList();

            if (tables.Count > 0)
            {
                foreach (var table in tables)
                {
                    table.IsAvailable = true;
                    _tableService.Update(table);
                }
            }

            _reservationService.Delete(id);

            return Ok();
        }

        // PUT
        // Update a given reservation
        [HttpPut]
        public ActionResult<UpdateReservationDto> Update([FromBody] UpdateReservationDto reservationDto)
        {
            if (reservationDto == null) return NotFound("Empty object was sent.");

            var reservationFromDb = _reservationService.Get(reservationDto.Id);

            if (reservationFromDb == null) return NotFound("Reservation doesn't exist.");

            reservationFromDb.Name = reservationDto.Name;
            reservationFromDb.PhoneNumber = reservationDto.PhoneNumber;

            _reservationService.Update(reservationFromDb);

            return Ok();
        }
    }
}
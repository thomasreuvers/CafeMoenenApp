using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cafeMoenenAPI.Dtos
{
    public class UpdateReservationDto
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public string PhoneNumber { get; set; }
    }
}

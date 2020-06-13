using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace cafeMoenenAPI.Models
{
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PhoneNumber { get; set; }

        public string Setting { get; set; }

        public int Guests { get; set; }

        public DateTime ReservationArrival { get; set; }

        public DateTime ReservationDepature { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public List<string> TableIds { get; set; }
    }
}

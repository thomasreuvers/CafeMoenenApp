using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace cafeMoenenAPI.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public List<string> BeverageIds { get; set; }

        public string TableId { get; set; }

        public string ReservationId { get; set; }
        public decimal OrderCost { get; set; }
    }
}

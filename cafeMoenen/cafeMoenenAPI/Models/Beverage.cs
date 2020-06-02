using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace cafeMoenenAPI.Models
{
    public class Beverage
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string BeverageName { get; set; }

        public decimal BeverageCost { get; set; }
    }
}

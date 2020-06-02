using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace cafeMoenenAPI.Models
{
    public class Table
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int Number { get; set; }

        public string Setting { get; set; }

        public bool IsAvailable { get; set; }
    }

    public enum Setting
    {
        Binnen,
        Buiten
    }
}

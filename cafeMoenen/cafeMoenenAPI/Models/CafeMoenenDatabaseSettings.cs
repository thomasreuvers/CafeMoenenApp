using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cafeMoenenAPI.Models
{
    public class CafeMoenenDatabaseSettings : ICafeMoenenDatabaseSettings
    {
        public string UsersCollectionName { get; set; }
        public string ReservationsCollectionName { get; set; }
        public string OrdersCollectionName { get; set; }
        public string TablesCollectionName { get; set; }
        public string BeveragesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ICafeMoenenDatabaseSettings{
        string UsersCollectionName { get; set; }
        string ReservationsCollectionName { get; set; }
        string OrdersCollectionName { get; set; }
        string TablesCollectionName { get; set; }
        string BeveragesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}

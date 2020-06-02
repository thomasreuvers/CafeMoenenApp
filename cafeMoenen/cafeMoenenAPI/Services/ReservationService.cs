using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeMoenenAPI.Models;
using MongoDB.Driver;

namespace cafeMoenenAPI.Services
{
    public class ReservationService
    {
        private readonly IMongoCollection<Reservation> _reservations;

        public ReservationService(ICafeMoenenDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _reservations = database.GetCollection<Reservation>(settings.ReservationsCollectionName);
        }

        public List<Reservation> Get() => _reservations.Find(reservation => true).ToList();

        public void Create(Reservation reservation) => _reservations.InsertOne(reservation);

    }
}

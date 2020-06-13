using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeMoenenAPI.Dtos;
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

        public Reservation Get(string id) => _reservations.Find(reservation => reservation.Id == id).FirstOrDefault();

        public void Create(Reservation reservation) => _reservations.InsertOne(reservation);

        public void Delete(string reservationId) => _reservations.DeleteOne(x => x.Id == reservationId);

        public void Update(Reservation reservation) =>
            _reservations.ReplaceOne(x => x.Id == reservation.Id, reservation);

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeMoenenAPI.Models;
using MongoDB.Driver;

namespace cafeMoenenAPI.Services
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _orders;

        public OrderService(ICafeMoenenDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _orders = database.GetCollection<Order>(settings.OrdersCollectionName);
        }

        public List<Order> Get() => _orders.Find(order => true).ToList();

        public List<Order> ByReservation(string id) => _orders.Find(order => order.ReservationId == id).ToList();

        public void Create(Order order) => _orders.InsertOne(order);
    }
}

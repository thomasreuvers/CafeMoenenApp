using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeMoenenAPI.Models;
using MongoDB.Driver;

namespace cafeMoenenAPI.Services
{
    public class BeverageService
    {
        private readonly IMongoCollection<Beverage> _beverages;

        public BeverageService(ICafeMoenenDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _beverages = database.GetCollection<Beverage>(settings.BeveragesCollectionName);
        }

        public List<Beverage> Get() => _beverages.Find(beverage => true).ToList();

        public Beverage ByName(string name) =>
            _beverages.Find(beverage => beverage.BeverageName == name).FirstOrDefault();

        public Beverage Get(string id) => _beverages.Find(beverage => beverage.Id == id).FirstOrDefault();
    }
}

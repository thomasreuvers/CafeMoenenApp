using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeMoenenAPI.Models;
using MongoDB.Driver;

namespace cafeMoenenAPI.Services
{
    public class TableService
    {
        private readonly IMongoCollection<Table> _tables;

        public TableService(ICafeMoenenDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _tables = database.GetCollection<Table>(settings.TablesCollectionName);
        }

        public Table Get(string id) => _tables.Find(table => table.Id == id).FirstOrDefault();

        public List<Table> GetListOfTable(string id) => _tables.Find(table => table.Id == id).ToList();

        public IEnumerable<Table> Get() => _tables.Find(table => true).ToList();

        public void Update(Table table) => _tables.ReplaceOne(x => x.Id == table.Id, table);
    }
}

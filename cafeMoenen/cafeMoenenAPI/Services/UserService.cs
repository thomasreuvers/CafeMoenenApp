using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeMoenenAPI.Models;
using MongoDB.Driver;

namespace cafeMoenenAPI.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(ICafeMoenenDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        /// <summary>
        /// Get user from database by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public User Get(string id) => _users.Find(user => user.Id.Equals(id)).FirstOrDefault();

        /// <summary>
        /// Authenticate user based on emailAddress and passwordHash,
        /// if a user with these credentials exist return user otherwise return null.
        /// </summary>
        /// <param name="emailAddress"></param>
        /// <param name="passwordHash"></param>
        /// <returns></returns>
        public User Authenticate(string emailAddress, string passwordHash) => _users
            .Find(user => user.EmailAddress.Equals(emailAddress) && user.PasswordHash.Equals(passwordHash))
            .FirstOrDefault();

        /// <summary>
        /// Creates a user in the database
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

    }
}

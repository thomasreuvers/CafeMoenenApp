using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeMoenenAPI.Models;
using cafeMoenenAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace cafeMoenenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // GET
        // Get user by specified id else return 404 response
        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST
        // Authenticate user model and return either a 404 response,
        // or a 200 response containing the user object.
        [HttpPost("authenticate")]
        public ActionResult<User> AuthenticateUser([FromBody] User model)
        {
            var user = _userService.Authenticate(model.EmailAddress, model.PasswordHash);

            if (user == null)
            {
                NotFound();
            }

            return Ok(user);
        }

        // POST
        // Create user and redirect to get method
        [HttpPost("create")]
        public ActionResult<User> Create([FromBody]User model)
        {
            _userService.Create(model);

            return CreatedAtRoute("GetUser", new {id = model.Id}, model);
        }
    }
}
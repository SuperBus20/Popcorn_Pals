using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Popcorn_Pals.Models;
using Popcorn_Pals.DAL;

namespace Popcorn_Pals.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PopcornUserController : ControllerBase
  {
    PopcornRepository _popRepo = new PopcornRepository();
    [HttpPost("createUser")]
    public User CreateUser(string userName, string password)
    {
      return _popRepo.AddUser(userName, password);
    }
    [HttpGet("Login")]
    public User Login(string userName, string password)
    {
      User user = _popRepo.GetUser(userName);
      if (user == null || user.Password != password)
      {
        return null;
      }
      return user;
    }
  }
}

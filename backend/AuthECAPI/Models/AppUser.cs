using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthECAPI.Models
{
    public class AppUser:IdentityUser
    {
        [Column(TypeName="nvarchar(150)")]
        public string FullName { get; set; }
    }
}

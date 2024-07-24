using System.ComponentModel.DataAnnotations.Schema;
using API.Types;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Entities;

[Table("user")]
[PrimaryKey("Id")]
public class User {

    [Column("user_id", TypeName = "int")]
    public int Id { get; set; }

    [Column("username", TypeName = "varchar")]
    public string Username { get; set; } = string.Empty;

    [Column("password", TypeName = "varchar")]
    [JsonIgnore]
    public string Password { get; set; } = string.Empty;

    [Column("full_name", TypeName = "varchar")]
    public string FullName { get; set; } = string.Empty;

    [Column("email", TypeName = "varchar")]
    public string Email { get; set; } = string.Empty;

    [Column("phone_number", TypeName = "varchar")]
    public string PhoneNumber { get; set; } = string.Empty;

    [Column("role", TypeName = "enum")]
    public Role Role { get; set; }

    [Column("jti", TypeName = "varchar")]
    public string JTI { get; set;} = string.Empty;

    public List<Building> Buildings {get; set;} = [];

    public List<Resident> Residencies {get; set;} = [];

    public List<Repair> Repairs {get; set;} = [];

    public List<Vote> Votes {get; set;} = [];

}
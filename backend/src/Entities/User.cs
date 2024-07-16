using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using API.Types;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("user")]
[PrimaryKey("id")]
public class User {

    [Column("user_id", TypeName = "int")]
    public int id { get; set; }

    [Column("username", TypeName = "varchar")]
    public string username { get; set; } = string.Empty;

    [Column("password", TypeName = "varchar")]
    [JsonIgnore]
    public string password { get; set; } = string.Empty;

    [Column("full_name", TypeName = "varchar")]
    public string fullName { get; set; } = string.Empty;

    [Column("email", TypeName = "varchar")]
    public string email { get; set; } = string.Empty;

    [Column("phone_number", TypeName = "varchar")]
    public string phoneNumber { get; set; } = string.Empty;

    [Column("role", TypeName = "enum")]
    public Role role { get; set; }
}
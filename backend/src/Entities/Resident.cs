using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("resident")]
[PrimaryKey("Id")]
public class Resident {

    [Column("resident_id", TypeName = "int")]
    public int Id {get; set;}

    [Column("user_id", TypeName = "int")]
    public int UserId {get; set;}

    [Column("apartment_id", TypeName = "int")]
    public int ApartmentId {get; set;}

    [Column("expires", TypeName = "date")]
    public DateOnly Expires {get; set;}

    [Column("is_owner", TypeName = "tinyint")]
    public bool IsOwner {get; set;} = false;

    public User? User {get; set;}

    public Apartment? Apartment {get; set;}

}
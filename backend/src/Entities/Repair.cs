using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("repair")]
[PrimaryKey("Id")]
public class Repair {

    [Column("repair_id", TypeName = "int")]
    public int Id {get; set;}

    [Column("user_id", TypeName = "int")]
    public int UserId {get; set;}

    [Column("apartment_id", TypeName = "int")]
    public int ApartmentId {get; set;}

    [Column("description", TypeName = "text")]
    public string Description {get; set;} = string.Empty;

    [Column("is_repaired", TypeName = "tinyint")]
    public bool IsRepaired {get; set;} = false;

    public User? User {get; set;}
    
    public Apartment? Apartment {get; set;}

}
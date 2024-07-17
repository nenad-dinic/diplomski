using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("apartment")]
[PrimaryKey("Id")]
public class Apartment {

    [Column("apartment_id", TypeName = "int")]
    public int Id {get; set;}

    [Column("building_id", TypeName = "int")]
    public int BuildingId {get; set;}

    [Column("number", TypeName = "int")]
    public int Number {get; set;}

    [Column("size", TypeName = "int")]
    public int Size {get; set;}

    [Column("number_of_residents", TypeName = "int")]
    public int NumberOfResidents {get; set;}

    public Building? Building {get; set;}

    public List<Bill> Bills {get; set;} = [];

    public List<Resident> Residents {get; set;} = [];

    public List<Repair> Repairs {get; set;} = [];

}
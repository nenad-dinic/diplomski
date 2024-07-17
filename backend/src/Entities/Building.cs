using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("building")]
[PrimaryKey("Id")]
public class Building {

    [Column("building_id", TypeName = "int")]
    public int Id { get; set;}

    [Column("manager_id", TypeName = "int")]
    public int ManagerId {get; set;}

    [Column("address", TypeName = "varchar")]
    public string Address { get; set;} = string.Empty;

    public User? Manager {get; set;}

    public List<Apartment> Apartments {get; set;} = [];

    public List<Meeting> Meetings {get; set;} = [];

    public List<Poll> Polls {get; set;} = [];
}
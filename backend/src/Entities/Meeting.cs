using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("meeting")]
[PrimaryKey("Id")]
public class Meeting {

    [Column("meeting_id", TypeName = "int")]
    public int Id {get; set;}

    [Column("building_id", TypeName = "int")]
    public int BuildingId {get; set;}

    [Column("date_time", TypeName = "datetime")]
    public DateTime DateTime {get; set;} = DateTime.Now;

    [Column("length", TypeName = "int")]
    public int Length {get; set;}

    [Column("description", TypeName = "text")]
    public string Description {get; set;} = string.Empty;

    public Building? Building {get; set;}

}
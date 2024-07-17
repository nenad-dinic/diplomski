using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("poll")]
[PrimaryKey("Id")]
public class Poll {

    [Column("poll_id", TypeName = "int")]
    public int Id {get; set;}

    [Column("building_id", TypeName = "int")]
    public int BuildingId {get; set;}

    [Column("title", TypeName = "varchar")]
    public int Title {get; set;}

    [Column("is_active", TypeName = "tinyint")]
    public bool IsActive {get; set;} = true;

    public Building? Building {get; set;}

    public List<Vote> Votes {get; set;} = [];

}
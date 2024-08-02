using System.ComponentModel.DataAnnotations.Schema;
using API.Attributes;
using EntityFrameworkCore.Projectables;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Entities;

[Table("poll")]
[PrimaryKey("Id")]
public class Poll {

    [Column("poll_id", TypeName = "int")]
    public int Id {get; set;}

    [Column("building_id", TypeName = "int")]
    public int BuildingId {get; set;}

    [Column("title", TypeName = "varchar")]
    [Searchable]
    public string Title {get; set;} = string.Empty;

    [Column("is_active", TypeName = "tinyint")]
    public bool IsActive {get; set;} = true;

    public Building? Building {get; set;}

    public List<Vote> Votes {get; set;} = [];

    [Projectable(UseMemberBody = nameof(_TotalVotes))]
    [NotMapped]
    public int TotalVotes {get; set;}

    [Projectable(UseMemberBody = nameof(_TotalYesVotes))]
    [NotMapped]
    public int TotalYesVotes {get; set;}

    [Projectable(UseMemberBody = nameof(_TotalNoVotes))]
    [NotMapped]
    public int TotalNoVotes {get; set;}

    [JsonIgnore]
    public int _TotalVotes => Votes.Count;

    [JsonIgnore]
    public int _TotalYesVotes => Votes.Count(v => v.Result == true);

    [JsonIgnore]
    public int _TotalNoVotes => Votes.Count(v => v.Result == false);

}
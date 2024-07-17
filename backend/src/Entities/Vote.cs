using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("vote")]
[PrimaryKey("Id")]
public class Vote {

    [Column("vote_id", TypeName = "int")]
    public int Id {get; set;}

    [Column("user_id", TypeName = "int")]
    public int UserId {get; set;}

    [Column("result", TypeName = "tinyint")]
    public bool Result {get; set;}

    public User? User {get; set;}
    public Poll? Poll {get; set;}

}
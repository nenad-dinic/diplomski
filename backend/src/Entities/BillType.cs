using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("bill_type")]
[PrimaryKey("Id")]
public class BillType {

    [Column("bill_type_id", TypeName = "int")]
    public int Id {get; set;}

    [Column("name", TypeName = "varchar")]
    public string Name {get; set;} = string.Empty;

    public List<Bill> Bills {get; set;} = [];

}
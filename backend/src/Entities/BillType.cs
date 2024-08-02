using System.ComponentModel.DataAnnotations.Schema;
using API.Attributes;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("bill_type")]
[PrimaryKey("Id")]
public class BillType {

    [Column("bill_type_id", TypeName = "int")]
    public int Id {get; set;}

    [Column("name", TypeName = "varchar")]
    [Searchable]
    public string Name {get; set;} = string.Empty;

    public List<Bill> Bills {get; set;} = [];

}
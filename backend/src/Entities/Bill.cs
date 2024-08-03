using System.ComponentModel.DataAnnotations.Schema;
using API.Attributes;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

[Table("bill")]
[PrimaryKey("Id")]
public class Bill {

    [Column("bill_id", TypeName = "int")]
    public int Id {get; set;}

    [Column("bill_type_id", TypeName = "int")]
    public int BillTypeId {get; set;}

    [Column("apartment_id", TypeName = "int")]
    public int ApartmentId {get; set;}

    [Column("month", TypeName = "int")]
    public int Month {get; set;}

    [Column("file_name", TypeName = "varchar")]
    [Searchable]
    public string FileName {get; set;} = string.Empty;

    [Column("file_path", TypeName = "varchar")]
    public string FilePath {get; set;} = string.Empty;

    [AutoInclude]
    public BillType? BillType {get; set;}

    public Apartment? Apartment {get; set;}

}
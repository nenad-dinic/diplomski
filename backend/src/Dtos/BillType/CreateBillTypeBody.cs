using System.ComponentModel.DataAnnotations;

namespace API.Dtos.BillType;

public class CreateBillTypeBody {

    [Required]
    [Length(1, 100)]
    public required string Name {get; set;}

}
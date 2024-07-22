using System.ComponentModel.DataAnnotations;

namespace API.Dtos.BillType;

public class UpdateBillTypeBody {

    [Length(1, 100)]
    public string? Name {get; set;}

}
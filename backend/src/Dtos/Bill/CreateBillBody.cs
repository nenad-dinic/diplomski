namespace API.Dtos.Bill;

public class CreateBillBody {

    public int BillTypeId {get; set;}
    public int ApartmentId {get; set;}
    public int Month {get; set;}
    public IFormFile File {get; set;} = null!;

}
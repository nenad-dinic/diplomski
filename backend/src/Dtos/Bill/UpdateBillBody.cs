namespace API.Dtos.Bill;

public class UpdateBillBody {

    public int? BillTypeId {get; set;}
    public int? ApartmentId {get; set;}
    public int? Month {get; set;}
    public IFormFile? File {get; set;}

}
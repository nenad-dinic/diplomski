using System.ComponentModel.DataAnnotations;
using API.Attributes.Validators;

namespace API.Dtos.Bill;

public class UpdateBillBody {

    [Range(1, int.MaxValue)]
    public int? BillTypeId {get; set;}

    [Range(1, int.MaxValue)]
    public int? ApartmentId {get; set;}
    
    [Range(1, 12)]
    public int? Month {get; set;}

    [MaxFileSize(1024 * 1024 * 10)] // 10 MB
    [AllowedFileExtensions(["doc", "docx", "pdf"])]
    public IFormFile? File {get; set;}

}
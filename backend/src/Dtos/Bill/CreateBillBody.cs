using System.ComponentModel.DataAnnotations;
using API.Attributes.Validators;

namespace API.Dtos.Bill;

public class CreateBillBody {

    [Required]
    [Range(1, int.MaxValue)]
    public required int BillTypeId {get; set;}

    [Required]
    [Range(1, int.MaxValue)]
    public required int ApartmentId {get; set;}

    [Required]
    [Range(1, 12)]
    public required int Month {get; set;}

    [Required]
    [MaxFileSize(1024 * 1024 * 10)] // 10 MB
    [AllowedFileExtensions(["doc", "docx", "pdf"])]
    public required IFormFile File {get; set;} = null!;

}
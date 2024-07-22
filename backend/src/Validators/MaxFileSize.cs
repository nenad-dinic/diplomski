using System.ComponentModel.DataAnnotations;

namespace API.Validators;

public class MaxFileSize(int maxFileSize) : ValidationAttribute
{

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext) {
        if (value is IFormFile file) {
            if (file.Length > maxFileSize) {
                return new ValidationResult(GetErrorMessage());
            }
        }

        return ValidationResult.Success;
    }

    public string GetErrorMessage()
    {
        return $"Maximum allowed file size is { maxFileSize} bytes.";
    }
}
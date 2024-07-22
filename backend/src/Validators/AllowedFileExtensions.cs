using System.ComponentModel.DataAnnotations;

namespace API.Validators;

public class AllowedFileExtensions(string[] extensions) : ValidationAttribute
{

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is IFormFile file)
        {
            string? extension = Path.GetExtension(file.FileName);
            if (!extensions.Contains(extension.TrimStart('.').ToLower()))
            {
                return new ValidationResult(GetErrorMessage());
            }
        }

        return ValidationResult.Success;
    }

    public string GetErrorMessage()
    {
        return $"Allowed file extensions are {string.Join(", ", extensions)}";
    }
}
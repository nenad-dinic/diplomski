namespace API.Attributes;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public class Searchable : Attribute
{
    public Searchable() {
        
    }
}
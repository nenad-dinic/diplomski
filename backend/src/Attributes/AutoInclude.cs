namespace API.Attributes;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public class AutoInclude : Attribute
{
    public AutoInclude() {}
}
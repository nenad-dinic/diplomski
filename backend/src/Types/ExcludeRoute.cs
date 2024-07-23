namespace API.Types;

public struct ExcludeRoute {
    public required string Method { get; set; }
    public required string Path { get; set; }
}
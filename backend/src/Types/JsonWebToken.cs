namespace API.Types;

public class JsonWebToken(string issuer, int subject, string type, DateTime issuedAt, DateTime expiresAt, string jwtId) {

    public string Issuer { get; private set; } = issuer;
    public int Subject {get; private set; } = subject;
    public string Type { get; private set; } = type;
    public DateTime IssuedAt { get; private set; } = issuedAt;
    public DateTime ExpiresAt { get; private set; } = expiresAt;
    public string JwtId { get; private set; } = jwtId;

}
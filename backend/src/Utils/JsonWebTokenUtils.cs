using JWT.Algorithms;
using JWT.Builder;

namespace API.Utils;

public class JsonWebTokenUtils {

    public static string CreateToken(string issuer, int subject, string type, DateTime issuedAt, int duration, string secret) {

        return JwtBuilder.Create()
            .WithAlgorithm(new HMACSHA256Algorithm())
            .WithSecret(secret)
            .AddClaim(ClaimName.Issuer, issuer)
            .AddClaim(ClaimName.Subject, subject)
            .AddClaim("typ", type)
            .AddClaim(ClaimName.IssuedAt, new DateTimeOffset(issuedAt).ToUnixTimeSeconds())
            .AddClaim(ClaimName.ExpirationTime, new DateTimeOffset(issuedAt).AddSeconds(duration).ToUnixTimeSeconds())
            .Encode();
    }

    public static Dictionary<string, object> DecodeToken(string token, string secret) {
        return JwtBuilder.Create()
            .WithAlgorithm(new HMACSHA256Algorithm())
            .WithSecret(secret)
            .MustVerifySignature()
            .Decode<Dictionary<string, object>>(token);
    }

}
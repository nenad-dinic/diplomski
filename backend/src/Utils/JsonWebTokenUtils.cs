using API.Types;
using JWT.Algorithms;
using JWT.Builder;

namespace API.Utils;

public class JsonWebTokenUtils {

    private static readonly Random random = new();

    public static string CreateToken(string issuer, int subject, string type, DateTime issuedAt, string jti, int duration, string secret) {

        return JwtBuilder.Create()
            .WithAlgorithm(new HMACSHA256Algorithm())
            .WithSecret(secret)
            .AddClaim(ClaimName.Issuer, issuer)
            .AddClaim(ClaimName.Subject, subject)
            .AddClaim("typ", type)
            .AddClaim(ClaimName.IssuedAt, new DateTimeOffset(issuedAt).ToUnixTimeSeconds())
            .AddClaim(ClaimName.ExpirationTime, new DateTimeOffset(issuedAt).AddSeconds(duration).ToUnixTimeSeconds())
            .AddClaim(ClaimName.JwtId, jti)
            .Encode();
    }

    public static JsonWebToken? DecodeToken(string token, string secret) {

        try {

            Dictionary<string, object> decoded = JwtBuilder.Create()
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret(secret)
                .MustVerifySignature()
                .Decode<Dictionary<string, object>>(token);

            string issuer = (string)decoded["iss"];
            int subject = decimal.ToInt32((decimal)decoded["sub"]);
            string type = (string)decoded["typ"];
            DateTime issuedAt = DateTimeOffset.FromUnixTimeSeconds(decimal.ToInt64((decimal)decoded["iat"])).DateTime;
            DateTime expiresAt = DateTimeOffset.FromUnixTimeSeconds(decimal.ToInt64((decimal)decoded["exp"])).DateTime;
            string jti = (string)decoded["jti"];

            return new JsonWebToken(issuer, subject, type, issuedAt, expiresAt, jti);

        } catch {
            return null;
        }

    }

    public static string GenerateJTI(int length) {

        string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

        return new string(Enumerable.Range(1, length).Select(_ => chars[random.Next(chars.Length)]).ToArray());

    }

}
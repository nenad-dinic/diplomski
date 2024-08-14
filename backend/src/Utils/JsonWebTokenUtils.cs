using API.Types;
using JWT.Algorithms;
using JWT.Builder;

namespace API.Utils;

public class JsonWebTokenUtils {

    private static readonly Random random = new();

    public static string CreateAuthToken(string issuer, int subject, string type, string jti, int duration, string secret) {
        return JwtBuilder.Create()
            .WithAlgorithm(new HMACSHA256Algorithm())
            .WithSecret(secret)
            .AddClaim(ClaimName.Issuer, issuer)
            .AddClaim(ClaimName.Subject, subject)
            .AddClaim("typ", type)
            .AddClaim(ClaimName.IssuedAt, DateTimeOffset.Now.ToUnixTimeSeconds())
            .AddClaim(ClaimName.ExpirationTime, DateTimeOffset.Now.AddSeconds(duration).ToUnixTimeSeconds())
            .AddClaim(ClaimName.JwtId, jti)
            .Encode();
    }

    public static AuthJWT? DecodeAuthToken(string token, string secret) {

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

            return new AuthJWT(issuer, subject, type, issuedAt, expiresAt, jti);

        } catch {
            return null;
        }

    }

    public static string GenerateJTI(int length) {

        string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

        return new string(Enumerable.Range(1, length).Select(_ => chars[random.Next(chars.Length)]).ToArray());

    }

    public static string CreateInviteToken(string issuer, string email, string typ, int targetId, string targetName, int duration, string secret) {

        return JwtBuilder.Create()
            .WithAlgorithm(new HMACSHA256Algorithm())
            .WithSecret(secret)
            .AddClaim(ClaimName.Issuer, issuer)
            .AddClaim(ClaimName.Subject, email)
            .AddClaim("typ", typ)
            .AddClaim("target", targetId)
            .AddClaim("targetName", targetName)
            .AddClaim(ClaimName.IssuedAt, DateTimeOffset.Now.ToUnixTimeSeconds())
            .AddClaim(ClaimName.ExpirationTime, DateTimeOffset.Now.AddSeconds(duration).ToUnixTimeSeconds())
            .Encode();

    }

    public static InviteJWT? DecodeInviteToken(string token, string secret) {

        try {
            Dictionary<string, object> decoded = JwtBuilder.Create()
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret(secret)
                .MustVerifySignature()
                .Decode<Dictionary<string, object>>(token);

            string issuer = (string)decoded["iss"];
            string subject = (string)decoded["sub"];
            string type = (string)decoded["typ"];
            string targetName = (string)decoded["targetName"];
            int target = decimal.ToInt32((decimal)decoded["target"]);
            DateTime issuedAt = DateTimeOffset.FromUnixTimeSeconds(decimal.ToInt64((decimal)decoded["iat"])).DateTime;
            DateTime expiresAt = DateTimeOffset.FromUnixTimeSeconds(decimal.ToInt64((decimal)decoded["exp"])).DateTime;

            return new InviteJWT(issuer, subject, type, target, targetName, issuedAt, expiresAt);
        } catch {
            return null;
        }

    }

}
namespace API.Types;

public class InviteJWT(string issuer, string subject, string type, int target, string targetName, DateTime issuedAt, DateTime expiresAt) {
        public string Issuer { get; private set; } = issuer;
        public string Subject { get; private set; } = subject;
        public string Type { get; private set; } = type;
        public string TargetName { get; private set; } = targetName;
        public int Target { get; private set; } = target;
        public DateTime IssuedAt { get; private set; } = issuedAt;
        public DateTime ExpiresAt { get; private set; } = expiresAt;
}
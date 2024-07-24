namespace API.Dtos.Authentication;

public class RefreshResponse(string accessToken, string refreshToken) {

    public string AccessToken {get; private set;} = accessToken;
    public string RefreshToken {get; private set;} = refreshToken;

}
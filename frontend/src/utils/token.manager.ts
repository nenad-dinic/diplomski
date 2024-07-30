export class TokenManager {

    public static getTokens() : [string | null, string | null] {

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        return [accessToken, refreshToken];

    }

    public static setTokens(accessToken : string, refreshToken : string) {

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

    }

    public static removeTokens() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    public static hasTokens() : boolean {
        return localStorage.getItem("accessToken") != null || localStorage.getItem("refreshToken") != null
    }

}

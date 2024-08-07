import { User } from "@/models/user.model";

export class TokenManager {

    private static userInfo : User | null = null;

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

    public static hasTokens() {
        return localStorage.getItem("accessToken") != null || localStorage.getItem("refreshToken") != null
    }

    public static getUserInfo() {
        return this.userInfo;
    }

    public static setUserInfo(userInfo : User) {
        this.userInfo = userInfo;
    }

    public static removeUserInfo() {
        this.userInfo = null;
    }

}

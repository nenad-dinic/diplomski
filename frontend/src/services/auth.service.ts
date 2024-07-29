import { Tokens } from "@/models/tokens.model";
import { User } from "@/models/user.model";
import { Service } from "@/services/service";

export class AuthenticationService extends Service {

    public static async login(username : string, password : string) {

        const response = await this.axios.post<Tokens>("/auth/login", {
            username,
            password
        });

        return response.data;

    }

    public static async register(username : string, password : string, fullName : string, email : string, phoneNumber : string) {

        const response = await this.axios.post<User>("/auth/register", {
            username,
            password,
            fullName,
            email,
            phoneNumber
        });

        return response.data;

    }

}
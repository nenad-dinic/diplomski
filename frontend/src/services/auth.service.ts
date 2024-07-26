import { Tokens } from "@/models/tokens";
import { Service } from "./service";

export class AuthenticationService extends Service {

    public static async login(username : string, password : string) {

        const response = await this.axios.post<Tokens>("/auth/login", {
            username,
            password
        });

        return response.data;

    }

}
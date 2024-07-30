import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { User } from "@/models/user.model";
import { Service } from "@/services/service";

export class UserService extends Service {

    static async getUsers(filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<User> | APIError>('/api/user', {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

}
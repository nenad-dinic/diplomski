import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { User } from "@/models/user.model";
import { Service } from "@/services/service";
import { optional } from "@/types/optional";
import { Role } from "@/types/role.enum";

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

    static async createUser(username : string, password : string, fullName : string, email : string, phoneNumber : string, role : Role) {

        const response = await this.axios.post<User | APIError>('/api/user', {
            username,
            password,
            fullName,
            email,
            phoneNumber,
            role
        });

        return response.data;

    }

    static async updateUser(id : number, username : optional<string>, password : optional<string>, fullName : optional<string>, email : optional<string>, phoneNumber : optional<string>, role : optional<Role>) {

        const response = await this.axios.put<User | APIError>(`/api/user/${id}`, {
            username,
            password,
            fullName,
            email,
            phoneNumber,
            role
        });

        return response.data;

    }

    static async deleteUser(id : number) {

        const response = await this.axios.delete<User | APIError>(`/api/user/${id}`);

        return response.data;

    }

}
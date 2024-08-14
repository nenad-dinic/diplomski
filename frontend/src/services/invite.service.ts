import { APIError } from "@/models/api-error.models";
import { Invite } from "@/models/invite.model";
import { Service } from "@/services/service";

export class InviteService extends Service {

    public static async checkInvite(token : string) {

        const response = await this.axios.post<Invite | APIError>(`/api/invite/check`, {
            token: token
        });

        return response.data;

    }

    public static async acceptInvite(token : string) {

        const response = await this.axios.post<Invite | APIError>(`/api/invite/accept`, {
            token: token
        });

        return response.data;

    }

}
import { APIError } from "@/models/api-error.models";
import { Invite } from "@/models/invite.model";
import { Service } from "@/services/service";

export class InviteService extends Service {

    public static async inviteManager(email : string, buildingId : number) {

        const response = await this.axios.post<{} | APIError>(`/api/invite/manager`, {
            email: email,
            buildingId: buildingId
        });

        return response.data

    }

    public static async inviteOwner(email: string, apartmentId: number) {

        const response = await this.axios.post<{} | APIError>(`/api/invite/owner`, {
            email: email,
            apartmentId: apartmentId
        });

        return response.data;

    }

    public static async inviteResident(email : string, apartmentId : number) {

        const response = await this.axios.post<{} | APIError>(`/api/invite/resident`, {
            email: email,
            apartmentId: apartmentId
        });

        return response.data
    }

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
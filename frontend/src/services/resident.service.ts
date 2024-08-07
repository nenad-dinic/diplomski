import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { Resident } from "@/models/resident.model";
import { Service } from "@/services/service";
import { optional } from "@/types/optional";

export class ResidentService extends Service {

    static async getResidentsByApartment(apartmentId : number, filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Resident> | APIError>(`/api/resident/apartment/${apartmentId}`, {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

    static async createResident(userId : number, apartmentId : number, expires : Date, isOwner : boolean) {

            const response = await this.axios.post<Resident | APIError>("/api/resident", {
                userId,
                apartmentId,
                expires: expires.toISOString().split("T")[0],
                isOwner
            });

            return response.data;
    }

    static async updateResident(id : number, userId : optional<number>, apartmentId : optional<number>, expires : optional<Date>, isOwner : optional<boolean>) {

        const response = await this.axios.put<Resident | APIError>(`/api/resident/${id}`, {
            userId,
            apartmentId,
            expires: expires?.toISOString().split("T")[0],
            isOwner
        });

        return response.data;
    }

    static async deleteResident(id : number) {

        const response = await this.axios.delete<Resident | APIError>(`/api/resident/${id}`);

        return response.data;

    }

}
import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { Repair } from "@/models/repair.model";
import { Service } from "@/services/service";
import { optional } from "@/types/optional";

export class RepairService extends Service {

    static async getRepairsByApartment(apartmentId : number, filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Repair> | APIError>(`/api/repair/apartment/${apartmentId}`, {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

    static async createRepair(userId : number, apartmentId : number, description : string) {

        const response = await this.axios.post<Repair | APIError>("/api/repair", {
            userId,
            apartmentId,
            description
        });

        return response.data;

    }

    static async updateRepair(id : number, userId : optional<number>, apartmentId : optional<number>, description : optional<string>, isRepaired : optional<boolean>) {

        const response = await this.axios.put<Repair | APIError>(`/api/repair/${id}`, {
            userId,
            apartmentId,
            description,
            isRepaired
        });

        return response.data;

    }

    static async deleteRepair(id : number) {
        
        const response = await this.axios.delete<Repair | APIError>(`/api/repair/${id}`);

        return response.data;

    }

}
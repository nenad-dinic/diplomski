import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { Repair } from "@/models/repair.model";
import { Service } from "@/services/service";

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

    static async deleteRepair(id : number) {
        
        const response = await this.axios.delete<Repair | APIError>(`/api/repair/${id}`);

        return response.data;

    }

}
import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { Resident } from "@/models/resident.model";
import { Service } from "@/services/service";

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

    static async deleteResident(id : number) {

        const response = await this.axios.delete<Resident | APIError>(`/api/resident/${id}`);

        return response.data;

    }

}
import { Apartment } from "@/models/apartment.model";
import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { Service } from "@/services/service";

export class ApartmentService extends Service {

    static async getApartmentsByBuilding(buildingId : number, filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Apartment> | APIError>(`/api/apartment/building/${buildingId}`, {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

}
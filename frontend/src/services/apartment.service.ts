import { Apartment } from "@/models/apartment.model";
import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { Service } from "@/services/service";

export class ApartmentService extends Service {

    static async getAllApartments(filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Apartment> | APIError>("/api/apartment", {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

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

    static async deleteApartment(id : number) {

        const response = await this.axios.delete<Apartment | APIError>(`/api/apartment/${id}`);

        return response.data;

    }

}
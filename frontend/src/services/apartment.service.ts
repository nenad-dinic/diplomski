import { Apartment } from "@/models/apartment.model";
import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { Service } from "@/services/service";
import { optional } from "@/types/optional";

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

    static async createApartment(buildingId: number, number: number, size: number, numberOfResidents: number) {

        const response = await this.axios.post<Apartment | APIError>("/api/apartment", {
            buildingId,
            number,
            size,
            numberOfResidents
        });

        return response.data;

    }

    static async updateApartment(id : number, buildingId : optional<number>, number : optional<number>, size : optional<number>, numberOfResidents : optional<number>) {

        const response = await this.axios.put<Apartment | APIError>(`/api/apartment/${id}`, {
            buildingId,
            number,
            size,
            numberOfResidents
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
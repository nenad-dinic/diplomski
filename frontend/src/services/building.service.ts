import { APIError } from "@/models/api-error.models";
import { Building } from "@/models/building.model";
import { Page } from "@/models/page";
import { Service } from "@/services/service";
import { optional } from "@/types/optional";

export class BuildingService extends Service {

    static async getBuildings(filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Building> | APIError>('/api/building', {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

    static async getBuildingsByManager(managerId : number, filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Building> | APIError>(`/api/building/manager/${managerId}`, {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

    static async createBuilding(managerId : number, address : string) {

        const response = await this.axios.post<Building | APIError>('/api/building', {
            managerId,
            address
        });

        return response.data;

    }

    static async updateBuilding(id : number, managerId : optional<number>, address : optional<string>) {

        const response = await this.axios.put<Building | APIError>(`/api/building/${id}`, {
            managerId,
            address
        });

        return response.data;

    }

    static async deleteBuilding(id : number) {

        const response = await this.axios.delete<Building | APIError>(`/api/building/${id}`);

        return response.data;

    }

}
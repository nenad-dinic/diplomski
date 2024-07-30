import { APIError } from "@/models/api-error.models";
import { Building } from "@/models/building.model";
import { Page } from "@/models/page";
import { Service } from "@/services/service";

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

}
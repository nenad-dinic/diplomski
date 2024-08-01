import { Service } from "@/services/service";

export class PollService extends Service {

    static async getPollsByBuilding(buildingId : number, filter : string, page : number, limit : number) {

        const response = await this.axios.get(`/api/poll/building/${buildingId}`, {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

}
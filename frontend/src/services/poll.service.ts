import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { Poll } from "@/models/poll.model";
import { Service } from "@/services/service";

export class PollService extends Service {

    static async getPollsByBuilding(buildingId : number, filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Poll> | APIError>(`/api/poll/building/${buildingId}`, {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

}
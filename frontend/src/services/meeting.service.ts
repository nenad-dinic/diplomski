import { APIError } from "@/models/api-error.models";
import { Meeting } from "@/models/meeting.model";
import { Page } from "@/models/page";
import { Service } from "@/services/service";

export class MeetingService extends Service {

    static async getMeetingsByBuilding(buildingId : number, filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Meeting> | APIError>(`/api/meeting/building/${buildingId}`, {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

}
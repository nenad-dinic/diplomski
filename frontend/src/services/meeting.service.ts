import { APIError } from "@/models/api-error.models";
import { Meeting } from "@/models/meeting.model";
import { Page } from "@/models/page";
import { Service } from "@/services/service";
import { optional } from "@/types/optional";

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

    static async createMeeting(buildingId : number, date : Date, length : number, description : string) {

        const response = await this.axios.post<Meeting | APIError>("/api/meeting", {
            buildingId,
            date,
            length,
            description
        });

        return response.data;

    }

    static async updateMeeting(id : number, buildingId : optional<number>, dateTime : optional<Date>, length : optional<number>, description : optional<string>) {

        const response = await this.axios.put<Meeting | APIError>(`/api/meeting/${id}`, {
            buildingId,
            dateTime,
            length,
            description
        });

        return response.data;

    }

    static async deleteMeeting(id : number) {

        const response = await this.axios.delete<Meeting | APIError>(`/api/meeting/${id}`);

        return response.data;

    }

}
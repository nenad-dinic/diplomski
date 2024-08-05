import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { Poll } from "@/models/poll.model";
import { Service } from "@/services/service";
import { optional } from "@/types/optional";

export class PollService extends Service {

    static async getPolls(filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Poll> | APIError>("/api/poll", {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

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

    static async createPoll(buildingId : number, title : string) {

        const response = await this.axios.post<Poll | APIError>("/api/poll", {
            buildingId,
            title
        });

        return response.data;

    }

    static async updatePoll(id : number, buildingId : optional<number>, title : optional<string>, isActive : optional<boolean>) {

        const response = await this.axios.put<Poll | APIError>(`/api/poll/${id}`, {
            buildingId,
            title,
            isActive
        });

        return response.data;

    }

    static async deletePoll(id : number) {

        const response = await this.axios.delete<Poll | APIError>(`/api/poll/${id}`);

        return response.data;

    }

}
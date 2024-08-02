import { APIError } from "@/models/api-error.models";
import { Page } from "@/models/page";
import { Vote } from "@/models/vote.model";
import { Service } from "@/services/service";

export class VoteService extends Service {

    static async getVotesByPoll(pollId : number, filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Vote> | APIError>(`/api/vote/poll/${pollId}`, {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

    static async deleteVote(id : number) {

        const response = await this.axios.delete<Vote | APIError>(`/api/vote/${id}`);

        return response.data;

    }

}
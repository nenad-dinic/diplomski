import { Service } from "@/services/service";

export class VoteService extends Service {

    static async getVotesByPoll(pollId : number, filter : string, page : number, limit : number) {

        const response = await this.axios.get(`/api/vote/poll/${pollId}`, {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

}
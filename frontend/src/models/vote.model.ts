import { Poll } from "@/models/poll.model";
import { User } from "@/models/user.model";

export interface Vote {

    id : number;
    pollId : number;
    userId : number;
    result : boolean;

    user ?: User;
    poll ?: Poll;

}
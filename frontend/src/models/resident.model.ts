import { Apartment } from "@/models/apartment.model";
import { User } from "@/models/user.model";

export interface Resident {

    id : number;
    userId : number;
    apartmentId : number;
    expires : string;
    isOwner : boolean;

    user ?: User;
    apartment ?: Apartment;

}
import { Apartment } from "@/models/apartment.model";
import { User } from "@/models/user.model";

export interface Repair {

    id : number;
    userId : number;
    apartmentId : number;
    createdAt : string;
    description : string;
    isRepaired : boolean;

    user ?: User;
    apartment ?: Apartment;

}
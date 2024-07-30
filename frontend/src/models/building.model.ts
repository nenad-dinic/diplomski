import { User } from "@/models/user.model";

export interface Building {

    id : number;
    managerId : number;
    address : string;
    manager ?: User;

}
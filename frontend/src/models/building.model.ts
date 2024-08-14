import { User } from "@/models/user.model";

export interface Building {

    id : number;
    managerId : number | null;
    address : string;
    manager ?: User;

}
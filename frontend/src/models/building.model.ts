import { User } from "@/models/user.model";

export interface Building {

    managerId : number;
    address : string;
    manager ?: User;

}
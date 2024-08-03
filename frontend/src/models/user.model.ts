import { Role } from "@/types/role.enum";

export interface User {

    id : number;
    username : string;
    fullName : string;
    email : string;
    phoneNumber : string;
    role : Role;

}
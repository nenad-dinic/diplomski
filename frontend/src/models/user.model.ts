export interface User {

    id : number;
    username : string;
    fullName : string;
    email : string;
    phoneNumber : string;
    role : "Admin" | "Manager" | "Resident";

}
export interface User {

    username : string;
    fullName : string;
    email : string;
    phoneNumber : string;
    role : "admin" | "manager" | "user";

}
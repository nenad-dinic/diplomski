import { BillType } from "@/models/bill-type.models";

export interface Bill {

    id : number;
    billTypeId : number;
    apartmentId : number;
    month : number;
    year: number;
    fileName : string;
    filePath : string;

    billType ?: BillType;

}
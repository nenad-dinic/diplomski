import { Building } from "@/models/building.model";

export interface Meeting {

    id : number;
    buildingId : number;
    dateTime : string;
    length : number;
    description : string;

    building ?: Building;

}
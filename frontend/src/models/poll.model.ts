import { Building } from "@/models/building.model";

export interface Poll {

    id : number;
    buildingId : number;
    title : string;
    isActive : boolean;
    totalVotes : number;
    totalYesVotes : number;
    totalNoVotes : number;

    building ?: Building;

}
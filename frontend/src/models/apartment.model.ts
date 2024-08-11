import { Building } from "@/models/building.model";
import { Resident } from "@/models/resident.model";

export interface Apartment {

    id : number;
    buildingId : number;
    number : number;
    size : number;
    numberOfResidents : number;

    building ?: Building;
    residents ?: Resident[];

}
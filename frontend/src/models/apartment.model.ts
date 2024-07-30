import { Building } from "@/models/building.model";

export interface Apartment {

    id : number;
    buildingId : number;
    number : number;
    size : number;
    numberOfResidents : number;

    building ?: Building;

}
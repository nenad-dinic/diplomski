import Combobox from "@/components/blocks/popovers/combobox";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { Building } from "@/models/building.model";
import { BuildingService } from "@/services/building.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface ManagerApartmentFormData {

    buildingId : number;
    number : number;
    size: number;
    numberOfResidents: number;

}

interface ManagerApartmentFormProps {

    apartment ?: Apartment;
    buildingId ?: number;
    managerId : number;
    onSubmit?: (values : ManagerApartmentFormData) => void;

}

export default function ManagerApartmentForm(props : ManagerApartmentFormProps) {

    const [buildings, setBuildings] = useState<Building[]>([]);

    const schema = z.object({
        buildingId: z.number({message: "Building is required"}).int("Building must be an integer").positive("Building must be positive"),
        number: z.number({message: "Number is required"}).int("Number must be an integer").positive("Number must be positive"),
        size: z.number({message: "Size is required"}).int("Size must be an integer").positive("Size must be positive"),
        numberOfResidents: z.number({message: "Residents is required"}).int("Residents must be an integer").gte(0, "Residents must be positive")
    });

    const form = useForm<ManagerApartmentFormData>({
        resolver: zodResolver(schema)
    });

    const toast = useToast();
    const logout = useLogout();

    async function getBuildings() {

        const buildings = await BuildingService.getBuildingsByManager(props.managerId, "", 1, 1000);

        if(buildings == null) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in buildings) {
            switch(buildings.status) {
                case 401:
                    logout();
                    break;
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            setBuildings(buildings.items);
        }

    }

    function onSubmit(values : ManagerApartmentFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {

        getBuildings();

        if(props.apartment != null) {
            form.reset({
                buildingId: props.buildingId ?? props.apartment.buildingId,
                number: props.apartment.number,
                size: props.apartment.size,
                numberOfResidents: props.apartment.numberOfResidents
            });
        } else {
            form.reset({
                buildingId: props.buildingId ?? 0,
                number: 1,
                size: 0,
                numberOfResidents: 0
            });
        }

    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="buildingId" render={({field}) => (
                <FormItem>
                    <FormLabel>Building: </FormLabel>
                    <Combobox disabled={props.buildingId != undefined || props.apartment != null} data={buildings.map(b => ({label: b.address, value: b.id}))} value={field.value} onChange={v => form.setValue(field.name, v)}></Combobox>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="number" render={({ field }) => (
                <FormItem>
                    <FormLabel>Number: </FormLabel>
                    <Input type="number" {...field} onChange={e => form.setValue(field.name, parseInt(e.target.value ?? "0"))}/>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="size" render={({ field }) => (
                <FormItem>
                    <FormLabel>Size: </FormLabel>
                    <Input type="number" {...field} onChange={e => form.setValue(field.name, parseInt(e.target.value ?? "0"))}/>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="numberOfResidents" render={({ field }) => (
                <FormItem>
                    <FormLabel>Residents: </FormLabel>
                    <Input type="number" {...field} onChange={e => form.setValue(field.name, parseInt(e.target.value ?? "0"))}/>
                    <FormMessage />
                </FormItem>
            )} />
            <Button className="w-full mt-2">{props.apartment != null ? "Update" : "Create"} Apartment</Button>
        </form>
    </Form>

}
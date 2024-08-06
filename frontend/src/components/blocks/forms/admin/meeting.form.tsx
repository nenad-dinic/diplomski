import Combobox from "@/components/blocks/popovers/combobox";
import DatePicker from "@/components/blocks/popovers/date-picker";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Building } from "@/models/building.model";
import { Meeting } from "@/models/meeting.model";
import { BuildingService } from "@/services/building.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface MeetingFormData {

    buildingId : number;
    date : Date;
    length : number;
    description : string;

}

interface MeetingFormProps {

    meeting ?: Meeting;
    onSubmit?: (values : MeetingFormData) => void;

}

export default function AdminMeetingForm(props : MeetingFormProps) {

    const [buildings, setBuildings] = useState<Building[]>([]);

    const schema = z.object({
        buildingId: z.number({message: "Building is required"}).int("Building must be an integer").positive("Building must be positive"),
        date: z.date({message: "Date is required"}),
        length: z.number({message: "Length is required"}).int("Length must be an integer").positive("Length must be positive"),
        description: z.string({message: "Description is required"}).min(1, "Description is required").max(1000, "Description is too long")
    });

    const form = useForm<MeetingFormData>({
        resolver: zodResolver(schema)
    });
    
    const toast = useToast();
    const logout = useLogout();

    async function getBuildings() {

        const building = await BuildingService.getBuildings("", 1, 1000);

        if(building == null) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in building) {
            switch(building.status) {
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
            setBuildings(building.items);
        }

    }

    function onSubmit(values : MeetingFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {
        getBuildings();

        if(props.meeting != null) {
            form.reset({
                buildingId: props.meeting.buildingId,
                date: new Date(props.meeting.dateTime),
                length: props.meeting.length,
                description: props.meeting.description
            });
        } else {
            form.reset({
                buildingId: 0,
                date: new Date(),
                length: 0,
                description: ""
            });
        }

    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="buildingId" render={({field}) => (
                <FormItem>
                    <FormLabel>Building: </FormLabel>
                    <Combobox disabled={props.meeting != null} data={buildings.map(b => ({label: b.address, value: b.id}))} value={field.value} onChange={v => form.setValue(field.name, v)}></Combobox>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="date" render={({field}) => (
                <FormItem>
                    <FormLabel>Date: </FormLabel>
                    <DatePicker value={field.value} onChange={v => form.setValue(field.name, v)} />
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="length" render={({field}) => (
                <FormItem>
                    <FormLabel>Length: </FormLabel>
                    <Input type="number" {...field} />
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({field}) => (
                <FormItem>
                    <FormLabel>Description: </FormLabel>
                    <Textarea {...field} />
                    <FormMessage />
                </FormItem>
            )} />
            <Button className="w-full mt-2">{props.meeting != null ? "Update" : "Create"} Meeting</Button>
        </form>
    </Form>

}
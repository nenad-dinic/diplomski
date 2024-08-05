import Combobox from "@/components/blocks/popovers/combobox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Building } from "@/models/building.model";
import { Poll } from "@/models/poll.model";
import { BuildingService } from "@/services/building.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface PollFormData {

    buildingId : number;
    title : string;
    isActive : boolean;

}

interface PollFormProps {

    poll ?: Poll;
    onSubmit?: (values : PollFormData) => void;

}

export default function AdminPollForm(props : PollFormProps) {

    const [buildings, setBuildings] = useState<Building[]>([]);

    const schema = z.object({
        buildingId: z.number({message: "Building is required"}).int("Building must be an integer").positive("Building must be positive"),
        title: z.string({message: "Title is required"}).min(1, "Title is required").max(100, "Title is too long"),
        isActive: z.boolean({message: "Is active is required"})
    });

    const form = useForm<PollFormData>({
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

    function onSubmit(values : PollFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {

        getBuildings();

        if(props.poll != null) {
            form.setValue("title", props.poll.title);
            form.setValue("isActive", props.poll.isActive);
            form.setValue("buildingId", props.poll.buildingId);
        } else {
            form.setValue("title", "");
            form.setValue("isActive", true);
            form.setValue("buildingId", 0);
        }

    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="buildingId" render={({field}) => (
                <FormItem>
                    <FormLabel>Building: </FormLabel>
                    <Combobox disabled={props.poll != null} data={buildings.map(b => ({label: b.address, value: b.id}))} value={field.value} onChange={v => form.setValue(field.name, v)}></Combobox>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                    <FormLabel>Title: </FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Enter title" {...field}></Input>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )} />
            <FormField control={form.control} name="isActive" render={({ field }) => (
                <FormItem>
                    <FormLabel>Is Active: </FormLabel>
                    <FormControl>
                        <Select disabled={props.poll == null} value={field.value ? "true" : "false"} onValueChange={v => field.onChange(v === "true" ? true : false)}>
                            <SelectTrigger>
                                <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )} />
            <Button className="w-full mt-2">{props.poll != null ? "Update" : "Create"} Poll</Button>
        </form>
    </Form>

}
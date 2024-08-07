import Combobox from "@/components/blocks/popovers/combobox";
import DateTimePicker from "@/components/blocks/popovers/date-picker";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { Resident } from "@/models/resident.model";
import { User } from "@/models/user.model";
import { ApartmentService } from "@/services/apartment.service";
import { UserService } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface ResidentFormData {

    userId : number;
    apartmentId : number;
    expires : Date;
    isOwner : boolean;

}

interface ResidentFormProps {

    resident ?: Resident;
    onSubmit?: (values : ResidentFormData) => void;

}

export default function AdminResidentForm(props : ResidentFormProps) {

    const [users, setUsers] = useState<User[]>([]);
    const [apartments, setApartments] = useState<Apartment[]>([]);

    const schema = z.object({
        userId: z.number({message: "User is required"}).int("User must be an integer").positive("User must be positive"),
        expires: z.date({message: "Expires is required"}),
        isOwner: z.boolean({message: "Is owner is required"})
    });

    const form = useForm<ResidentFormData>({
        resolver: zodResolver(schema)
    });

    const toast = useToast();
    const logout = useLogout();

    async function getUsers() {

        const users = await UserService.getUsers("", 1, 1000);

        if(users == null) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in users) {
            switch(users.status) {
                case 401:
                    logout();
                    break;
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
                    break;
            }
        } else {
            setUsers(users.items);
        }

    }

    async function getApartments() {

        const apartments = await ApartmentService.getAllApartments("", 1, 1000);

        if(apartments == null) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in apartments) {
            switch(apartments.status) {
                case 401:
                    logout();
                    break;
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
                    break;
            }
        } else {
            setApartments(apartments.items);
        }

    }

    function onSubmit(values : ResidentFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {

        getUsers();
        getApartments();

        if(props.resident != null) {
            form.reset({
                userId: props.resident.userId,
                apartmentId: props.resident.apartmentId,
                expires: new Date(props.resident.expires),
                isOwner: props.resident.isOwner
            });
        } else {
            form.reset({
                userId: 0,
                apartmentId: 0,
                expires: new Date(),
                isOwner: false
            });
        }

    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="userId" render={({field}) => (
                <FormItem>
                    <FormLabel>User: </FormLabel>
                    <Combobox disabled={props.resident != null} data={users.map(u => ({label: u.fullName, value: u.id}))} value={field.value} onChange={v => form.setValue(field.name, v)}></Combobox>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="apartmentId" render={({field}) => (
                <FormItem>
                    <FormLabel>Apartment: </FormLabel>
                    <Combobox disabled={props.resident != null} data={apartments.map(a => ({label: a.number.toString(), value: a.id}))} value={field.value} onChange={v => form.setValue(field.name, v)}></Combobox>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="expires" render={({field}) => (
                <FormItem>
                    <FormLabel>Expires: </FormLabel>
                    <DateTimePicker dateOnly value={field.value} onChange={v => form.setValue(field.name, v)}/>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="isOwner" render={({field}) => (
                <FormItem>
                    <FormLabel>Is owner: </FormLabel>
                    <Select value={field.value ? "true" : "false"} onValueChange={v => field.onChange(v === "true" ? true : false)}>
                        <SelectTrigger>
                            <SelectValue></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
            <Button className="w-full mt-2">{props.resident != null ? "Update" : "Create"} Resident</Button>
        </form>
    </Form>

}
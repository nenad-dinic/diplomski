import Combobox from "@/components/blocks/popovers/combobox";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { Repair } from "@/models/repair.model";
import { User } from "@/models/user.model";
import { ApartmentService } from "@/services/apartment.service";
import { UserService } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface AdminRepairFormData {

    userId : number;
    apartmentId : number;
    description : string;
    isRepaired : boolean;

}

interface AdminRepairFormProps {

    repair ?: Repair;
    onSubmit?: (values : AdminRepairFormData) => void;

}

export default function AdminRepairForm(props : AdminRepairFormProps) {

    const [users, setUsers] = useState<User[]>([]);
    const [apartments, setApartments] = useState<Apartment[]>([]);

    const schema = z.object({
        userId: z.number({message: "User is required"}).int("User must be an integer").positive("User must be positive"),
        apartmentId: z.number({message: "Apartment is required"}).int("Apartment must be an integer").positive("Apartment must be positive"),
        description: z.string({message: "Description is required"}).min(1, "Description must not be empty"),
        isRepaired: z.boolean({message: "Is repaired is required"})
    });

    const form = useForm<AdminRepairFormData>({
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
            }
        } else {
            setApartments(apartments.items);
        }

    }

    function onSubmit(values : AdminRepairFormData) {
        if(props.onSubmit) {
            props.onSubmit(values);
        }
    }

    useEffect(() => {

        getUsers();
        getApartments();

        if(props.repair) {
            form.reset({
                userId: props.repair.userId,
                apartmentId: props.repair.apartmentId,
                description: props.repair.description,
                isRepaired: props.repair.isRepaired
            });
        } else {
            form.reset({
                userId: 0,
                apartmentId: 0,
                description: "",
                isRepaired: false
            });
        }

    }, []);

    return <Form {...form}>
            <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="userId" render={({field}) => (
                    <FormItem>
                        <FormLabel>User: </FormLabel>
                        <Combobox disabled={props.repair != null} data={users.map(u => ({label: u.fullName, value: u.id}))} value={field.value} onChange={v => form.setValue(field.name, v)} />
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="apartmentId" render={({field}) => (
                    <FormItem>
                        <FormLabel>Apartment: </FormLabel>
                        <Combobox disabled={props.repair != null} data={apartments.map(a => ({label: a.number.toString(), value: a.id}))} value={field.value} onChange={v => form.setValue(field.name, v)} />
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
                <FormField control={form.control} name="isRepaired" render={({field}) => (
                    <FormItem>
                        <FormLabel>Is repaired: </FormLabel>
                        <Select disabled={props.repair == null} value={field.value ? "true" : "false"} onValueChange={v => field.onChange(v === "true" ? true : false)}>
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
                <Button className="w-full mt-2">{props.repair != null ? "Update" : "Create"} Repair</Button>
            </form>
        </Form>

}
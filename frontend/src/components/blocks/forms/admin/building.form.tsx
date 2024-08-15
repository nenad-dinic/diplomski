import Combobox from "@/components/blocks/popovers/combobox";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Building } from "@/models/building.model";
import { User } from "@/models/user.model";
import { UserService } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface AdminBuildingFormData {

    address : string;
    managerId : number;

}

interface AdminBuildingFormProps {

    building?: Building;
    onSubmit?: (values: AdminBuildingFormData) => void;

}

export default function AdminBuildingForm(props : AdminBuildingFormProps) {

    const [managers, setManagers] = useState<User[]>([]);

    const schema = z.object({
        address: z.string({message: "Address is required"}).min(1, "Address cannot be empty"),
        managerId: z.number({message: "Manager is required"}).int("Manager must be an integer").positive("Manager must be positive").optional()
    });

    const form = useForm<AdminBuildingFormData>({
        resolver: zodResolver(schema)
    });

    const toast = useToast();
    const logout = useLogout();

    async function getManagers() {

        const managers = await UserService.getManagers("", 1, 1000);

        if(managers == null) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in managers) {
            switch(managers.status) {
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
            setManagers(managers.items);
        }

    }

    function onSubmit(values : AdminBuildingFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {

        getManagers();

        if(props.building) {
            form.reset({
                address: props.building.address,
                managerId: props.building.managerId ?? undefined
            });
        } else {
            form.reset({
                address: "",
                managerId: undefined
            });
        }

    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="address" render={({field}) => (
                <FormItem>
                    <FormLabel>Address: </FormLabel>
                    <Input {...field} />
                    <FormMessage/>
                </FormItem>
            )} />
            <FormField control={form.control} name="managerId" render={({field}) => (
                <FormItem>
                    <FormLabel>Manager: </FormLabel>
                    <Combobox data={managers.map(m => ({label: m.fullName, value: m.id}))} value={field.value} onChange={v => form.setValue(field.name, v)}></Combobox>
                    <FormMessage/>
                </FormItem>
            )} />
             <Button className="w-full mt-2">{props.building != null ? "Update" : "Create"} Building</Button>
        </form>
    </Form>

}
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BillType } from "@/models/bill-type.models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface AdminBillTypeFormData {

    name : string;

}

interface AdminBillTypeFormProps {

    billType ?: BillType;
    onSubmit?: (values : AdminBillTypeFormData) => void;

}

export default function AdminBillTypeForm(props : AdminBillTypeFormProps) {

    const schema = z.object({
        name: z.string({message: "Name is required"}).min(1, "Name is required").max(100, "Name is too long")
    });

    const form = useForm<AdminBillTypeFormData>({
        resolver: zodResolver(schema)
    });

    function onSubmit(values : AdminBillTypeFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {

        if(props.billType != null) {
            form.reset({
                name: props.billType.name
            });
        } else {
            form.reset({
                name: ""
            });
        }

    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                    <FormLabel>Name: </FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Enter name" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <Button className="block mx-auto mt-2 w-full">{props.billType != null ? "Update" : "Create"} Bill Type</Button>
        </form>
    </Form>

}
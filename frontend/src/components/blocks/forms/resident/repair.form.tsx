import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Repair } from "@/models/repair.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface ResidentRepairFormData {

    userId : number;
    apartmentId : number;
    description : string;
}

interface ResidentRepairFormProps {

    repair ?: Repair;
    apartmentId: number;
    userId: number;
    onSubmit?: (values : ResidentRepairFormData) => void;

}

export default function ResidentRepairForm(props : ResidentRepairFormProps) {

    const schema = z.object({
        userId: z.number({message: "User is required"}).int("User must be an integer").positive("User must be positive"),
        apartmentId: z.number({message: "Apartment is required"}).int("Apartment must be an integer").positive("Apartment must be positive"),
        description: z.string({message: "Description is required"}).min(1, "Description must not be empty"),
        isRepaired: z.boolean({message: "Is repaired is required"})
    });

    const form = useForm<ResidentRepairFormData>({
        resolver: zodResolver(schema)
    });

    function onSubmit(values : ResidentRepairFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {

        if(props.repair) {
            form.reset({
                userId: props.repair.userId,
                apartmentId: props.repair.apartmentId,
                description: props.repair.description
            });
        } else {
            form.reset({
                userId: props.userId,
                apartmentId: props.apartmentId,
                description: ""
            });
        }

    }, []);

    return <Form {...form}>
            <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="description" render={({field}) => (
                    <FormItem>
                        <FormLabel>Description: </FormLabel>
                        <Textarea {...field} />
                        <FormMessage />
                    </FormItem>
                )} />
                <Button className="w-full mt-2">{props.repair != null ? "Update" : "Create"} Repair</Button>
            </form>
        </Form>

}
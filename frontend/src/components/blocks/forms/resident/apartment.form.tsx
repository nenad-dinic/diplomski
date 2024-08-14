import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Apartment } from "@/models/apartment.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface ResidentApartmentFormData {
    numberOfResidents : number;
}

interface ResidentApartmentFormProps {
    apartment?: Apartment;
    onSubmit?: (values: ResidentApartmentFormData) => void;
}

export default function ResidentApartmentForm(props : ResidentApartmentFormProps) {

    const schema = z.object({
        numberOfResidents: z.number({message: "Residents is required"}).int("Residents must be an integer").gte(0, "Residents must be positive")
    });

    const form = useForm<ResidentApartmentFormData>({
        resolver: zodResolver(schema)
    });

    function onSubmit(values : ResidentApartmentFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {

        if(props.apartment) {
            form.reset({
                numberOfResidents: props.apartment.numberOfResidents
            });
        } else {
            form.reset({
                numberOfResidents: 0
            });
        }

    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
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
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface InviteFormData {
    email : string;
}

interface InviteFormProps {
    onSubmit ?: (values : InviteFormData) => void;
}

export default function InviteForm(props : InviteFormProps) {

    const schema = z.object({
        email: z.string({message: "Email is required"}).email("Email is not valid")
    });

    const form = useForm<InviteFormData>({
        resolver: zodResolver(schema)
    });

    function onSubmit(values : InviteFormData) {
        props.onSubmit?.(values);
    }

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                    <FormLabel>Email: </FormLabel>
                    <Input type="email" placeholder="Enter the email of the person you want to invite" {...field}></Input>
                    <FormMessage />
                </FormItem>
            )} />
            <Button className="w-full mt-2">Invite</Button>
        </form>
    </Form>

}
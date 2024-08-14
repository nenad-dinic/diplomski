import { Button } from "../../ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../../ui/form";
import { Input } from "../../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export interface LoginFormData {
    username : string;
    password : string;
}

interface LoginFormProps {
    username ?: string;
    onSubmit?: (values : LoginFormData) => void;
};

export default function LoginForm(props : LoginFormProps) {

    const schema = z.object({
        username: z.string({message: "Username is required"}).min(1, "Username is required").default(""),
        password: z.string({message: "Password is required"}).min(1, "Password is required").default("")
    });

    const form = useForm<LoginFormData>({
        resolver: zodResolver(schema)
    });

    function onSubmit(values : LoginFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {

        form.reset({
            username: props.username ?? "",
            password: ""
        });

    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="username" render={({ field }) => (
                <FormItem>
                    <FormLabel>Username: </FormLabel>
                    <FormControl>
                        <Input disabled={props.username != undefined} type="text" placeholder="Enter your username" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                    <FormLabel>Password: </FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <Button className="block mx-auto mt-2 w-full">Login</Button>
        </form>
    </Form>

}
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";

export interface RegistrationFormData {
    username : string;
    password : string;
    fullName : string;
    email : string;
    phoneNumber : string;
}

interface RegistrationFormProps {
    onSubmit?: (values : RegistrationFormData) => void;
}

export default function RegistrationForm(props : RegistrationFormProps) {

    const schema = z.object({
        username: z.string({message: "Username is required"}).min(1, "Username is required").max(50, "Username is too long"),
        password: z.string({message: "Password is required"}).min(8, "Password is too short"),
        confirmPassword: z.string({message: "Password confirmation is required"}),
        fullName: z.string({message: "Full Name is required"}).min(1, "Full Name is required").max(100, "Full Name is too long"),
        email: z.string({message: "Email is required"}).email("Invalid email"),
        phoneNumber: z.string({message: "Phone number is required"}).min(1, "Phone is required").max(20, "Phone number is too long")
    }).superRefine((values, ctx) => {
        if(values.password !== values.confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["confirmPassword"]
            });
        }
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    });

    function onSubmit(values : z.infer<typeof schema>) {
        delete (values as Partial<typeof values>).confirmPassword;
        props.onSubmit?.(values);
    }

    return <>
        <Form {...form}>
            <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="username" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username: </FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Enter username" {...field}></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password: </FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Enter password" {...field}></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password: </FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Enter password" {...field}></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name: </FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Enter Full Name" {...field}></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email: </FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Enter email" {...field}></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone Number: </FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Enter Phone Number" {...field}></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <Button className="w-full mt-2">Register</Button>
            </form>
        </Form>
    </>

}
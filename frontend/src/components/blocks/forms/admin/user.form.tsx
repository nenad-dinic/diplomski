import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/models/user.model";
import { Role } from "@/types/role.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface UserFormData {
    username : string;
    password : string;
    fullName : string;
    email : string;
    phoneNumber : string;
    role : Role;
}

interface UserFormProps {
    user ?: User;
    onSubmit?: (values : UserFormData) => void;
}

export default function AdminUserForm(props : UserFormProps) {

    const schema = z.object({
        username: z.string({message: "Username is required"}).min(1, "Username is required").max(50, "Username is too long"),
        password: z.string({message: "Password is required"}).superRefine((value, ctx) => {
            if(props.user == null && value.length < 8) {
                ctx.addIssue({
                    code: "custom",
                    message: "Password must be at least 8 characters long"
                });
            } else if(props.user != null && value.length > 0 && value.length < 8) {
                ctx.addIssue({
                    code: "custom",
                    message: "Password must be at least 8 characters long"
                });
            }
        }),
        fullName: z.string({message: "Full name is required"}).min(1, "Full name is required").max(100, "Full name is too long"),
        email: z.string({message: "Email is required"}).email("Invalid email").max(320, "Email is too long"),
        phoneNumber: z.string({message: "Phone number is required"}).min(1, "Phone number is required").max(20, "Phone number is too long"),
        role: z.nativeEnum(Role)
    });

    const form = useForm<UserFormData>({
        resolver: zodResolver(schema)
    });

    function onSubmit(values : UserFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {
        if(props.user != null) {
            form.reset({
                username: props.user.username,
                password: "",
                fullName: props.user.fullName,
                email: props.user.email,
                phoneNumber: props.user.phoneNumber,
                role: props.user.role
            });
        } else {
            form.reset({
                username: "",
                password: "",
                fullName: "",
                email: "",
                phoneNumber: "",
                role: Role.Resident
            });
        }
    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="username" render={({ field }) => (
                <FormItem>
                    <FormLabel>Username: </FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Enter username" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                    <FormLabel>Password: </FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Enter password" {...field}></Input>
                    </FormControl>
                    <FormDescription>Password is updated ONLY when a value is provided here</FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                    <FormLabel>Full Name: </FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Enter full name" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                    <FormLabel>Email: </FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Enter email" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone Number: </FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Enter phone number" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem>
                    <FormLabel>Role: </FormLabel>
                    <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(Role).map(role => (
                                    <SelectItem value={role}>{role}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <Button className="w-full mt-2">{props.user != null ? "Update" : "Create"} User</Button>
        </form>
    </Form>

}
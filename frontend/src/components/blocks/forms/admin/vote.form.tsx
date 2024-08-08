import Combobox from "@/components/blocks/popovers/combobox";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Poll } from "@/models/poll.model";
import { User } from "@/models/user.model";
import { Vote } from "@/models/vote.model";
import { PollService } from "@/services/poll.service";
import { UserService } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface AdminVoteFormData {

    pollId : number;
    userId : number;
    result : boolean;

}

interface AdminVoteFormProps {

    vote ?: Vote;
    onSubmit?: (values : AdminVoteFormData) => void;

}

export default function AdminVoteForm(props : AdminVoteFormProps) {

    const [users, setUsers] = useState<User[]>([]);
    const [polls, setPolls] = useState<Poll[]>([]);

    const schema = z.object({
        pollId: z.number({message: "Poll is required"}).int("Poll must be an integer").positive("Poll must be positive"),
        userId: z.number({message: "User is required"}).int("User must be an integer").positive("User must be positive"),
        result: z.boolean({message: "Result is required"})
    });

    const form = useForm<AdminVoteFormData>({
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

    async function getPolls() {

        const polls = await PollService.getPolls("", 1, 1000);

        if(polls == null) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in polls) {
            switch(polls.status) {
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
            setPolls(polls.items);
        }

    }

    function onSubmit(values : AdminVoteFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {

        getPolls();
        getUsers();

        if(props.vote != null) {
            form.reset({
                pollId: props.vote.pollId,
                userId: props.vote.userId,
                result: props.vote.result
            });
        } else {
            form.reset({
                pollId: polls[0].id,
                userId: users[0].id,
                result: false
            });
        }

    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="userId" render={({field}) => (
                <FormItem>
                    <FormLabel>User: </FormLabel>
                    <Combobox disabled={props.vote != null} data={users.map(u => ({label: u.fullName, value: u.id}))} value={field.value} onChange={v => form.setValue(field.name, v)}></Combobox>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="pollId" render={({field}) => (
                <FormItem>
                    <FormLabel>Poll: </FormLabel>
                    <Combobox disabled={props.vote != null} data={polls.map(p => ({label: p.title, value: p.id}))} value={field.value} onChange={v => form.setValue(field.name, v)}></Combobox>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="result" render={({field}) => (
                <FormItem>
                    <FormLabel>Result: </FormLabel>
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
            <Button className="w-full mt-2">{props.vote != null ? "Update" : "Create"} Vote</Button>
        </form>
    </Form>

}
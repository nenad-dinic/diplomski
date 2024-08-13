import Combobox from "@/components/blocks/popovers/combobox";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { BillType } from "@/models/bill-type.models";
import { Bill } from "@/models/bill.model";
import { BillTypeService } from "@/services/bill-type.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface ResidentBillFormData {

    billTypeId : number;
    apartmentId : number;
    month : number;
    year : number;
    file : File | null;

}

interface ResidentBillFormProps {
    bill?: Bill;
    apartmentId: number;
    onSubmit?: (values: ResidentBillFormData) => void;
}

export default function ResidentBillForm(props : ResidentBillFormProps) {

    const [billTypes, setBillTypes] = useState<BillType[]>([]);

    const schema = z.object({
        billTypeId: z.number({message: "Bill type is required"}).int("Bill type must be an integer").positive("Bill type must be positive"),
        apartmentId: z.number({message: "Apartment is required"}).int("Apartment must be an integer").positive("Apartment must be positive"),
        month: z.number({message: "Month is required"}).int("Month must be an integer").min(1, "Month must be between 1 and 12").max(12, "Month must be between 1 and 12"),
        year: z.number({message: "Year is required"}).int("Year must be an integer").min(2000, "Year must be between 2000 and 2999").max(2999, "Year must be between 2000 and 2999"),
        file: z.instanceof(File, {message: "File is required"}).nullable().superRefine((f, ctx) => {
            if(props.bill == null && f == null) {
                return ctx.addIssue({
                    code: "custom",
                    message: "File is required"
                });
            }
        })
    });

    const form = useForm<ResidentBillFormData>({
        resolver: zodResolver(schema)
    });

    const toast = useToast();
    const logout = useLogout();

    async function getBillTypes() {

        const billTypes = await BillTypeService.getAllBillTypes("", 1, 1000);

        if(billTypes == null) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in billTypes) {
            switch(billTypes.status) {
                case 401:
                    logout();
                    break;
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
                    break;
            }
        } else {
            setBillTypes(billTypes.items);
        }

    }

    function onSubmit(values : ResidentBillFormData) {
        props.onSubmit?.(values);
    }

    useEffect(() => {

        getBillTypes();

        if(props.bill) {
            form.reset({
                billTypeId: props.bill.billTypeId,
                apartmentId: props.bill.apartmentId,
                month: props.bill.month,
                year: props.bill.year,
                file: null
            });
        } else {
            form.reset({
                billTypeId: 0,
                apartmentId: props.apartmentId,
                month: 1,
                year: new Date().getFullYear(),
                file: null
            });
        }

    }, []);

    return <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="billTypeId" render={({field}) => (
                <FormItem>
                    <FormLabel>Type: </FormLabel>
                    <Combobox data={billTypes.map(bt => ({label: bt.name, value: bt.id}))} value={field.value} onChange={v => form.setValue(field.name, v)}/>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="month" render={({field}) => (
                <FormItem>
                    <FormLabel>Month: </FormLabel>
                    <Select value={field.value?.toString()} onValueChange={v => field.onChange(parseInt(v ?? "0"))}>
                        <SelectTrigger>
                            <SelectValue></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">January</SelectItem>
                            <SelectItem value="2">February</SelectItem>
                            <SelectItem value="3">March</SelectItem>
                            <SelectItem value="4">April</SelectItem>
                            <SelectItem value="5">May</SelectItem>
                            <SelectItem value="6">June</SelectItem>
                            <SelectItem value="7">July</SelectItem>
                            <SelectItem value="8">August</SelectItem>
                            <SelectItem value="9">September</SelectItem>
                            <SelectItem value="10">October</SelectItem>
                            <SelectItem value="11">November</SelectItem>
                            <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}/>
            <FormField control={form.control} name="year" render={({field}) => (
                <FormItem>
                    <FormLabel>Year: </FormLabel>
                    <Input type="number" value={field.value?.toString()} onChange={v => field.onChange(parseInt(v.target.value ?? "0"))} />
                    <FormMessage />
                </FormItem>
            )}/>
            <FormField control={form.control} name="file" render={({field}) => (
                <FormItem>
                    <FormLabel>File: </FormLabel>
                    <Input type="file" onChange={e => form.setValue(field.name, e.target.files?.[0] ?? null)} />
                    <FormMessage />
                </FormItem>
            )}/>
            <Button className="w-full mt-2">{props.bill != null ? "Update" : "Create"} Bill</Button>
        </form>
    </Form>

}
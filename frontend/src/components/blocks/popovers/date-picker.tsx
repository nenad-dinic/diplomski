import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimePickerDemo } from "@/components/ui/time-picker";
import { cn } from "@/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";

interface DateTimePickerProps {
    value : Date;
    onChange : (value : Date) => void;
    disabled ?: boolean;
    dateOnly ?: boolean;
}

export default function DateTimePicker(props : DateTimePickerProps) {

    const [open, setOpen] = useState(false);

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={props.disabled} className="w-full">
            <FormControl>
                <Button disabled={props.disabled} type="button" variant="outline" className={cn("pl-3 text-left font-normal", !props.value && "text-muted-foreground")}>
                    {props.value ? (
                        (props.dateOnly ? format(props.value, "PPP") : format(props.value, "Pp"))
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
            <div className="flex flex-col items-center">
                <Calendar
                    mode="single"
                    selected={props.value}
                    onSelect={(date) => {
                        if(date == null) return;
                        props.onChange?.(date);
                    }}
                    initialFocus
                />
                {!props.dateOnly && <TimePickerDemo date={props.value} setDate={date => {
                    if(date == null) return;
                    props.onChange?.(date)
                }}/>}
            </div>
        </PopoverContent>
    </Popover>

}
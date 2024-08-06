import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type ComboboxData<T> = {
    label : string;
    value : T;
}

interface ComboboxProps<T> {
    data : ComboboxData<T>[];
    value : T;
    disabled ?: boolean;
    onChange : (value : T) => void;
}

export default function Combobox<T extends any>(props : ComboboxProps<T>) {

    const [open, setOpen] = useState(false);

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={props.disabled} className="w-full">
            <FormControl>
                <Button disabled={props.disabled} type="button" variant="outline" role="combobox" className={cn("justify-between", !props.value && "text-muted-foreground", "w-full")}>
                    {props.value ? props.data.find((data) => data.value === props.value)?.label : "Select option"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
                <CommandInput placeholder="Search" className="h-9"/>
                <CommandList>
                    <CommandEmpty>No item found</CommandEmpty>
                    <CommandGroup>
                        {props.data.map(d => <CommandItem onSelect={() => {props.onChange?.(d.value); setOpen(false)}}>
                            {d.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                props.value === d.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            </CommandItem>
                        )}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>

}
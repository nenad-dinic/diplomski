import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ReactNode, useState } from "react";

interface DeletePopoverProps {
    trigger : ReactNode;
    onDelete ?: () => void;
}

export default function DeletePopover(props : DeletePopoverProps) {

    const [open, setOpen] = useState(false);

    return <>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {props.trigger}
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-2">
                    <p>Are you sure you want to delete this item?</p>
                    <div className="flex gap-2">
                        <Button className="grow" variant="destructive" onClick={() => props.onDelete?.()}>Delete</Button>
                        <Button className="grow" variant="default" onClick={() => setOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    </>

}
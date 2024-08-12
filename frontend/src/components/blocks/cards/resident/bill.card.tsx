import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bill } from "@/models/bill.model";
import { API_PUBLIC_URL } from "@/utils/environment";
import { Icon } from '@iconify/react';

interface ResidentBillCardProps {
    bill : Bill;
}

export default function ResidentBillCard(props : ResidentBillCardProps) {

    function downloadBill() {
        const link = document.createElement("a");
        link.href = `${API_PUBLIC_URL}/${props.bill.filePath}`;
        link.download = props.bill.fileName;
        link.click();
    }

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center">
            <Icon icon="mdi:invoice-list" fontSize={"4em"}/>
            <h2 className="text-xl">{props.bill.billType?.name}</h2>
            <div className="px-3 w-full text-center text-sm text-gray-500">
                <p>Month: {props.bill.month}</p>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" onClick={() => downloadBill()}><Icon className="mr-2" icon="octicon:download-16" fontSize="1.5em"/> Download</Button>
        </CardFooter>
    </Card>

}
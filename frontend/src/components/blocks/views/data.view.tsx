import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Page } from "@/models/page";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SelectValue } from "@radix-ui/react-select";
import { FormEvent, useState } from "react";

interface DataViewProps<T> {

    data : Page<T>;
    headers : string[];
    rowRenderer : (item : T) => JSX.Element;
    onFilterChange? : (filter : string) => void;
    onPageChange? : (page : number) => void;
    onLimitChange? : (limit : number) => void;

}

export default function DataView(props : DataViewProps<any>) {

    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    function getPages() {

        if(props.data == undefined) {
            return [];
        }

        const pages = Array.from({ length: props.data.totalPages ?? 1 }, (_, i) => i + 1);

        const max = pages.length;
        const delta = 1;
        const curr = page;

        const filtered = pages.filter(p => {

            if (p === 1) {
                return true;
            }

            if (p === max) {
                return true;
            }

            if (p >= curr - delta && p <= curr + delta) {
                return true;
            }

            if (p <= delta * 2 + 3 && curr <= delta + 3) {
                return true;
            }

            if (p >= max - (delta * 2 + 2) && curr >= max - (delta + 2)) {
                return true;
            }

            if (max <= (delta * 2 + 5)) {
                return true;
            }

            return false;
        });

        console.log(filtered);

        return filtered;

    }

    function handleSubmit(e : FormEvent) {
        e.preventDefault();
        props.onFilterChange?.(filter);
    }

    function changePage(page : number) {
        if(page < 1 || page > (props.data.totalPages ?? 1)) {
            return;
        }
        setPage(page);
        props.onPageChange?.(page);
    }

    function changeLimit(limit : number) {
        setLimit(limit);
        props.onLimitChange?.(limit);
    }

    return <>
        <div className="p-4 w-full">
            <form onSubmit={handleSubmit} className="flex w-fit">
                <Input value={filter} onChange={e => setFilter(e.target.value)} className="rounded-tr-none rounded-br-none" type="text" placeholder="Search"></Input>
                <Button type="submit" className="rounded-tl-none rounded-bl-none pl-2 pr-2"><Icon fontSize="1.25rem" icon="material-symbols:search"/></Button>
            </form>
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        {props.headers.map((header) => <TableHead>{header}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.data.items.map((item) => props.rowRenderer(item))}
                </TableBody>
            </Table>

            <div className="flex flex-row gap-2 mt-4 justify-end mr-4">

                <Select value={limit.toString()} onValueChange={v => changeLimit(parseInt(v))}>
                    <SelectTrigger className="w-24">
                        <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>

                <Pagination className="w-fit mx-0">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink onClick={() => changePage(page - 1)}><Icon icon="ooui:next-rtl" fontSize="1em"/></PaginationLink>
                        </PaginationItem>
                        {getPages().map((p, i, a) =>
                            <>
                                {a[i] - a[i -1] > 1 && <PaginationEllipsis/>}
                                <PaginationLink onClick={() => changePage(p)} isActive={p === page}>{p}</PaginationLink>
                            </>
                        )}
                        <PaginationItem>
                            <PaginationLink onClick={() => changePage(page + 1)}><Icon icon="ooui:next-ltr" fontSize="1em"/></PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

        </div>
    </>

}
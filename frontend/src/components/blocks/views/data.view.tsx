import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Page } from "@/models/page";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SelectValue } from "@radix-ui/react-select";
import { FormEvent, ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface DataViewProps<T> {

    headers : string[];
    rowRenderer : (item : T) => JSX.Element;
    fetchCallback : (filter : string, page : number, limit : number) => Promise<Page<T> | undefined>;

}

export interface DataViewRef {
    refresh : () => void;
}

export default forwardRef(function DataView<T>(props : DataViewProps<T>, ref : ForwardedRef<DataViewRef>) {

    const [data, setData] = useState<Page<T>>();

    const [filter, setFilter] = useState<string>("");

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    useImperativeHandle(ref, () => ({
        refresh: () => {
            getData();
        }
    }));

    function getPages() {

        if(data == undefined) {
            return [];
        }

        const pages = Array.from({ length: data.totalPages ?? 1 }, (_, i) => i + 1);

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

        return filtered;

    }

    function handleSubmit(e : FormEvent) {
        e.preventDefault();

        setSearch(filter);
    }

    function changePage(page : number) {
        if(page < 1 || page > (data?.totalPages ?? 1)) {
            return;
        }
        setPage(page);
    }

    function changeLimit(limit : number) {
        setLimit(limit);
    }

    async function getData() {
        const data = await props.fetchCallback(search, page, limit);
        if(data != undefined) {
            setData(data);
        }
    }

    useEffect(() => {
        getData();
    }, [search, page, limit]);

    return <>
        <div className="p-4">
            <form onSubmit={handleSubmit} className="flex w-fit max-sm:justify-center max-sm:w-full">
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
                    {data?.items.map((item) => props.rowRenderer(item))}
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

})
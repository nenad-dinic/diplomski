import { APIError } from "@/models/api-error.models";
import { BillType } from "@/models/bill-type.models";
import { Page } from "@/models/page";
import { Service } from "@/services/service";

export class BillTypeService extends Service {

    static async getAllBillTypes(filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<BillType> | APIError>('/api/bill-type', {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

    static async deleteBillType(id : number) {

        const response = await this.axios.delete<BillType | APIError>(`/api/bill-type/${id}`);

        return response.data;

    }

}
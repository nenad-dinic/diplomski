import { APIError } from "@/models/api-error.models";
import { Bill } from "@/models/bill.model";
import { Page } from "@/models/page";
import { Service } from "@/services/service";

export class BillService extends Service {

    static async getBillsByApartment(apartmentId : number, filter : string, page : number, limit : number) {

        const response = await this.axios.get<Page<Bill> | APIError>(`/api/bill/apartment/${apartmentId}`, {
            params: {
                filter,
                page,
                limit
            }
        });

        return response.data;

    }

    static async deleteBill(id : number) {

        const response = await this.axios.delete<Bill | APIError>(`/api/bill/${id}`);

        return response.data;

    }

}
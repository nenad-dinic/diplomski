import { APIError } from "@/models/api-error.models";
import { Bill } from "@/models/bill.model";
import { Page } from "@/models/page";
import { Service } from "@/services/service";
import { optional } from "@/types/optional";

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

    static async createBill(billTypeId : number, apartmentId : number, month : number, year : number, file : File) {

        const formData = new FormData();

        formData.append("billTypeId", billTypeId.toString());
        formData.append("apartmentId", apartmentId.toString());
        formData.append("month", month.toString());
        formData.append("year", year.toString());

        if(file) {
            formData.append("file", file);
        }

        const response = await this.axios.post<Bill | APIError>("/api/bill", formData);

        return response.data;

    }

    static async updateBill(id : number, billTypeId : optional<number>, apartmentId : optional<number>, month : optional<number>, year : optional<number>, file : optional<File>) {

        const formData = new FormData();

        if(billTypeId) {
            formData.append("billTypeId", billTypeId.toString());
        }

        if(apartmentId) {
            formData.append("apartmentId", apartmentId.toString());
        }

        if(month) {
            formData.append("month", month.toString());
        }

        if(year) {
            formData.append("year", year.toString());
        }

        if(file) {
            formData.append("file", file);
        }

        const response = await this.axios.put<Bill | APIError>(`/api/bill/${id}`, formData);

        return response.data;

    }

    static async deleteBill(id : number) {

        const response = await this.axios.delete<Bill | APIError>(`/api/bill/${id}`);

        return response.data;

    }

}
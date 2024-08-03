import { Analytics } from "@/models/analytics.model";
import { APIError } from "@/models/api-error.models";
import { Service } from "@/services/service";

export class AnalyticsService extends Service {

    static async getAnalytics() {

        const response = await this.axios.get<Analytics | APIError>("/api/analytics");

        return response.data;

    }

}
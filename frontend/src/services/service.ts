import { APIError } from "@/models/api-error.models";
import { Tokens } from "@/models/tokens.model";
import { TokenManager } from "@/utils/token.manager";
import axios, { Axios, AxiosRequestConfig } from "axios";

export abstract class Service {

    private static _axios : Axios | null = null;

    protected static get axios() {

        if(Service._axios != null) {
            return Service._axios;
        }

        const instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            validateStatus: () => true
        });

        const refreshToken = async () => {
            const [_, refreshToken] = TokenManager.getTokens();
            const response = await instance.post<Tokens | APIError>("/auth/refresh", {
                token: refreshToken
            });

            if(response.status !== 200 || "status" in response.data) {
                return null;
            }

            return response.data;
        };

        instance.interceptors.request.use((cfg) => {
            const [accessToken, _] = TokenManager.getTokens();
            cfg.headers.Authorization = `Bearer ${accessToken}`;
            return cfg;
        });

        instance.interceptors.response.use(async (response) => {

            const originalRequest = response.config as AxiosRequestConfig & {_retry?: boolean};

            if(response.status === 401 && !originalRequest._retry) {

                const tokens = await refreshToken();

                if(tokens == null) {
                    return response;
                }

                TokenManager.setTokens(tokens.accessToken, tokens.refreshToken);

                originalRequest.headers!.Authorization = `Bearer ${tokens.accessToken}`;
                originalRequest._retry = true;

                response = await instance.request(originalRequest);

            }

            return response;

        });

        return Service._axios = instance;

    }

}
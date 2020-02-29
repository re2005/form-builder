import axios from './axios.service';
import { ApiTypes, RequestParams } from '@/types/api.types';

const apiService: ApiTypes = {

    get(service: string, params?: Array<any>): Promise<any> {
        return axios.get(this.makeApiEndpoint(service, params));
    },

    post(service: string, data: any, params?: Array<RequestParams>) {
        return axios.post(this.makeApiEndpoint(service, params), data);
    },

    delete(service: string, data: any, params?: Array<RequestParams>) {
        return axios.delete(this.makeApiEndpoint(service, params), data);
    },

    makeApiEndpoint(service: string, params?: Array<RequestParams>): string {
        const baseUrl = this.getApiUrl() + service + '/';
        const apiUrl = new URL(baseUrl);
        if (params) {
            params.forEach(p => apiUrl.searchParams.append(p.key, p.value));
        }
        return apiUrl.href;
    },

    getApiUrl() {
        // You can find API URL definition on the .env and .env.development files
        return process.env.VUE_APP_API_URL;
    }
};

export default apiService;

export interface ApiTypes {

    get(service: string, params?: Array<RequestParams>): Promise<any>;

    delete(service: string, data?: any, params?: Array<RequestParams>): Promise<any>;

    post(service: string, data: any, params?: Array<RequestParams>): Promise<any>;

    makeApiEndpoint(service: string, params?: Array<RequestParams>): string;

    getApiUrl(): string;

}

export interface RequestParams {
    key: string;
    value: string;
}

export interface LoginInterface {
    email: string;
    password: string;
    captcha_response: string;
}

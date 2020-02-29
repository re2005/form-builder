export interface UserStoreTypes {
    session: any;
}

export interface SessionTypes {
    user: UserTypes;
    id: string;
    created: string;
    last_modified: string;
    expires: string;
    keepalive: string;
}

export interface UserTypes {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    captcha_response?: string;
    address: UserAddressTypes;
}

export interface UserAddressTypes {
    street: string;
    postal_code?: string;
    number: string;
    addition: string;
    city: string;
    province: string;
    country: string;
}

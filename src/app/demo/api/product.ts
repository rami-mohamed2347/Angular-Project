interface Status {
    label: string;
    value: string;
}
export interface Product {
    id?: string;
    code?: string;
    color?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    status?: Status;
    category?: string;
    media?: any;
    rating?: number;
}

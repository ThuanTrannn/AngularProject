export interface IProducts {
    id?: number;
    artist?:string;
    title?: string;
    price?: {
        value: number;
        currency: string;
    };
    description?: string;
    image?: string;
    date?: string;
    category?: string;
    qty?: number;
}

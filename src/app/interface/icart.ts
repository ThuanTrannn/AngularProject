// products.interface.ts
export interface Product {
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
}

// cart-item.interface.ts
export interface CartItem {
    product: Product;
    quantity: number;
}
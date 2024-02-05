export interface Order {
    id: string;
    userId: string;
    idProducts: string;
    image: string;
    title: string;
    price: {
        value: number;
        currency: string;
    };
    quantity: number;
}

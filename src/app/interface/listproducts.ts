
export interface ListProducts {
    image: string;
    title: string;
    artist: string;
    category: string;
    description: string;
    price: {
        value: number;
        currency: string;
    };
}
export interface Product {
    image: string;
    brand: string;
    model: string;
    price: number;
    availability: string;
    link: string;
    retailer: string;
    detail: { productDetails: { datetime: string; price: number; availability: string; }[]; };
}


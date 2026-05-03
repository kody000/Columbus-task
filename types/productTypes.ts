
export interface Image {
    url: string;
    altText: string;
}

export interface Promotion {
    name: string;
    percentage: number;
}

export interface Product {
    articleNumber: string;
    ean: string;
    link: string;
    image: Image;
    title: string;
    description: string;
    brandName: string;
    brandLogo: string;
    price: number;
    promotion?: Promotion | null;
}

export interface ProductsData {
    title: string;
    logo: Image;
    products: Product[];
}
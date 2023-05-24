export interface Thumbnail {
    _id?: string;
    urlId?: string;
    url: string;
}

export interface Picture {
    _id?: string;
    urlId?: string;
    url: string;
}

export interface Product {
    _id: string;
    name: string;
    price: string;
    sizes: any[];
    description: string;
    colors: any[];
    discount: string;
    quantity: string;
    thumbnails: Thumbnail[];
    category?: string;
    categoryId?: string;
}

export interface User {
    name: string;
    surname: string;
    email: string;
    password?: string;
    phone: string;
    role?: string;
    accessToken: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Alias {
    _id: string;
    name: string;
    deleted: boolean;
}

export interface Category {
    _id: string;
    name: string;
    deleted: boolean;
}

export interface News {
    _id: string;
    title: string;
    content: string;
    pictures: Picture[];
}

export interface HomeData {
    bannerUrls: string[];
    shirtProducts: Product[];
    trousersProducts: Product[];
    homeBasic: any;
}

export interface Size {
    _id: string;
    sizeName: string;
}

export interface Color {
    _id: string;
    colorName: string;
    thumbnail: string;
}

export interface Policy {
    image: string;
    title: string;
}

export interface CartItem {
    thumbnail: string;
    size: Size;
    color: Color;
    quantity: number | string;
    price: number | string;
    productName: string;
    productId: string;
    discount: number | string;
}

export interface ProductInOrder {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
    thumbnail: string;
    discount: number;
}

export interface Order {
    _id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    note: string;
    products: ProductInOrder[];
    conscious: string;
    district: string;
    sumMoney: number;
    status: string;
    createdAt: Date;
}

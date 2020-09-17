export interface Restaurant {
    id: string;
    name: string;
    description: string;
    pictureId: string;
    city: string;
    rating: number;
}

export interface RestaurantDetails extends Restaurant {
    address: string;
    categories: Category[];
    menus: Menus;
    consumerReviews: ConsumerReview[];
}

export interface Category {
    name: string;
}

export interface Food {
    name: string;
}

export interface Drink {
    name: string;
}

export interface Menus {
    foods: Food[];
    drinks: Drink[];
}

export interface ConsumerReview {
    name: string;
    review: string;
    date: string;
}
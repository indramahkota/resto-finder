import { CustomerReview } from "./CustomerReviewEntity";

export interface Restaurant {
    id: string;
    name: string;
    description: string;
    pictureId: string;
    city: string;
    rating: number;
    isFavorite: boolean;
}

export interface RestaurantDetails extends Restaurant {
    address: string;
    categories: Category[];
    menus: Menus;
    customerReviews: CustomerReview[];
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
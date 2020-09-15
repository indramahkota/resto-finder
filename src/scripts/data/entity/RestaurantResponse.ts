import { Restaurant, RestaurantDetails } from "./RestaurantEntity";

export interface RestaurantResponse {
    error: boolean;
    message: string;
    count: number;
    restaurants: Restaurant[];
}

export interface RestaurantDetailsResponse {
    error: boolean;
    message: string;
    restaurant: RestaurantDetails;
}
import { CustomerReview } from "../entity/CustomerReviewEntity";
import { CustomerReviewResponse } from "../entity/CustomerReviewResponse";
import { RestaurantDetails } from "../entity/RestaurantEntity";
import { RestaurantDetailsResponse, RestaurantResponse } from "../entity/RestaurantResponse";

export interface DbService {
    putFavorite(data: RestaurantDetails): Promise<string>;
    getFavoriteById(id: string): Promise<RestaurantDetails | undefined>;
    getAllFavorites(): Promise<RestaurantDetails[]>;
    deleteFavorite(id: string): Promise<void>;
}

export interface ApiService {
    getAllRestaurants(): Promise<RestaurantResponse>;
    getRestaurantDetails(id: string): Promise<RestaurantDetailsResponse>;
    postRestaurantReview(customerReview: CustomerReview): Promise<CustomerReviewResponse>;
}
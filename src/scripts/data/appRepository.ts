import AppConfig from '../globals/appConfig';
import { CustomerReview } from './entity/CustomerReviewEntity';
import { CustomerReviewResponse } from './entity/CustomerReviewResponse';
import { RestaurantDetails } from './entity/RestaurantEntity';
import { RestaurantDetailsResponse, RestaurantResponse } from './entity/RestaurantResponse';
import { DbService, ApiService } from './sources/appServices';
import { Database } from './sources/local/clientDatabase';
import { get, post } from './sources/network/networkDataSource';

export default class AppRepository implements DbService, ApiService {
    async putFavorite(data: RestaurantDetails): Promise<string> {
        const db = await Database();
        return await db.put('restaurants', data);
    }

    async getFavoriteById(id: string): Promise<RestaurantDetails | undefined> {
        const db = await Database();
        return await db.get('restaurants', id);
    }

    async getAllFavorite(): Promise<RestaurantDetails[]> {
        const db = await Database();
        return await db.getAll('restaurants');
    }

    async deleteFavorite(id: string): Promise<void> {
        const db = await Database();
        return await db.delete('restaurants', id);
    }

    async getAllRestaurant(): Promise<RestaurantResponse> {
        return await get<RestaurantResponse>(AppConfig.BASE_URL + 'list');
    }

    async getRestaurantDetails(id: string): Promise<RestaurantDetailsResponse> {
        return await get<RestaurantDetailsResponse>(`${AppConfig.BASE_URL}detail/${id}`);
    }

    async postRestaurantReview(customerReview: CustomerReview): Promise<CustomerReviewResponse> {
        return await post<CustomerReviewResponse, CustomerReview>(`${AppConfig.BASE_URL}review`, customerReview);
    }
}
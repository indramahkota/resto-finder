import AppConfig from '../globals/appConfig';
import { CustomerReview } from './entity/CustomerReviewEntity';
import { CustomerReviewResponse } from './entity/CustomerReviewResponse';
import { RestaurantDetails } from './entity/RestaurantEntity';
import { RestaurantDetailsResponse, RestaurantResponse } from './entity/RestaurantResponse';
import { DbService, ApiService } from './sources/appServices';
import ClientDatabase from './sources/local/clientDatabase';
import NetworkServer from './sources/network/networkServer';

export default class AppRepository implements DbService, ApiService {
    private _net: NetworkServer;
    private _db: ClientDatabase;

    constructor(
        networkServer: NetworkServer,
        clientDatabase: ClientDatabase
    ) {
        this._net = networkServer;
        this._db = clientDatabase;
    }

    async putFavorite(data: RestaurantDetails): Promise<string> {
        return await this._db.putRestaurant(data);
    }

    async getFavoriteById(id: string): Promise<RestaurantDetails | undefined> {
        return await this._db.getRestaurant(id);
    }

    async getAllFavorites(): Promise<RestaurantDetails[]> {
        return await this._db.getAllRestaurant();
    }

    async deleteFavorite(id: string): Promise<void> {
        return await this._db.deleteRestaurant(id);
    }

    async getAllRestaurants(): Promise<RestaurantResponse> {
        return await this._net.get<RestaurantResponse>(
            AppConfig.BASE_URL + 'list'
        );
    }

    async getRestaurantDetails(
        id: string
    ): Promise<RestaurantDetailsResponse> {
        return await this._net.get<RestaurantDetailsResponse>(
            `${AppConfig.BASE_URL}detail/${id}`
        );
    }

    async postRestaurantReview(
        customerReview: CustomerReview
    ): Promise<CustomerReviewResponse> {
        return await this._net.post<CustomerReviewResponse, CustomerReview>(
            `${AppConfig.BASE_URL}review`, customerReview
        );
    }
}
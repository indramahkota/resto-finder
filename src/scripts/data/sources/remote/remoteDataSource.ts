import AppConfig from "../../../globals/appConfig";

export default class RemoteDataSource {
    static async getAllRestaurant<T>(): Promise<T> {
        const response = await fetch(AppConfig.BASE_URL+'list');
        if (response !== undefined && response.status === 200) {
            return await Promise.resolve(response.json());
        }
        return await Promise.reject(new Error(`Code: ${response.status}, ${response.statusText}`));
    }
}
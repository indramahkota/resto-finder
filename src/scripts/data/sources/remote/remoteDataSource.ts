import AppConfig from "../../../globals/appConfig";

export default class RemoteDataSource {
    static async getAllRestaurant<T>(): Promise<T> {
        const response = await fetch(AppConfig.BASE_URL+'list');
        if (response !== undefined && response.status === 200) {
            /* #WARNING# Sebaiknya jangan pakai setTimeout() */
            await new Promise(res => setTimeout(res, 500));
            return await Promise.resolve(response.json());
        }
        return await Promise.reject(new Error(`Code: ${response.status}, ${response.statusText}`));
    }

    static async getRestaurantDetails<T>(id: string): Promise<T> {
        const response = await fetch(`${AppConfig.BASE_URL}detail/${id}`);
        if (response !== undefined && response.status === 200) {
            /* #WARNING# Sebaiknya jangan pakai setTimeout() */
            await new Promise(res => setTimeout(res, 500));
            return await Promise.resolve(response.json());
        }
        return await Promise.reject(new Error(`Code: ${response.status}, ${response.statusText}`));
    }
}
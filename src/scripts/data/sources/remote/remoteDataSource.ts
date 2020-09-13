import AppConfig from "../../../globals/appConfig";

export default class RemoteDataSource {
    static async getAllRestaurant<T>(): Promise<T> {
        const response = await fetch(AppConfig.BASE_URL+'list');
        if (response !== undefined && response.status === 200) {
            /* #WARNING# Sebaiknya jangan:::Supaya nampak loadingnya aja wkwk */
            await new Promise(res => setTimeout(res, 1000));
            return await Promise.resolve(response.json());
        }
        return await Promise.reject(new Error(`Code: ${response.status}, ${response.statusText}`));
    }
}
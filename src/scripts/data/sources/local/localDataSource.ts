export default class LocalDataSource {
    static async getJsonData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (response !== undefined && response.status === 200) {
            return await Promise.resolve(response.json());
        }
        return await Promise.reject(new Error(`Code: ${response.status}, ${response.statusText}`));
    }
}
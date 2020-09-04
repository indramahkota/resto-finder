/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-04 14:27:57
 * @modify date 2020-09-04 14:27:57
 * @desc [description]
 */

export default class LocalDataSource {
    static async getJsonData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (response !== undefined && response.status === 200) {
            return await Promise.resolve(response.json());
        }
        return await Promise.reject(new Error(`Code: ${response.status}, ${response.statusText}`));
    }
}
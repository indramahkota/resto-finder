/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-02 16:57:21
 * @modify date 2020-09-02 16:59:49
 * @desc [description]
 */

export default class Utils {
    static setLCS(key: string, value:string) {
        window.localStorage.setItem(key, value);
    }

    static getLCS(key: string): string | null {
        return window.localStorage.getItem(key);
    }
}
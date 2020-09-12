export default class Utils {
    static setLCS(key: string, value: string): void {
        window.localStorage.setItem(key, value);
    }

    static getLCS(key: string): string | null {
        return window.localStorage.getItem(key);
    }
}
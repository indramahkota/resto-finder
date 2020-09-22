import AppConfig from "./appConfig";

export default class Utils {
    static setLCS(key: string, value: string): void {
        window.localStorage.setItem(key, value);
    }

    static getLCS(key: string): string | null {
        return window.localStorage.getItem(key);
    }

    static genImgSrc(imageId: string | undefined, size: string): string | undefined {
        return imageId === undefined ? undefined : `${AppConfig.BASE_IMAGE_URL}${size}/${imageId}`;
    }

    static capitalizeWords(str: string): string {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}
import AppConfig from "./appConfig";
import AppExeption from "./appExeption";

type ImageQuality = "small" | "medium" | "large";

export function getLocalStorage(): Storage {
    if (!window.localStorage)
        throw new Error(AppExeption.LOCAL_STORAGE_NOT_SUPPORTED);
    return window.localStorage;
}

export default class Utils {
    static setLCS(key: string, value: string): void {
        if (key === '')
            throw new Error(AppExeption.LOCAL_STORAGE_KEY_CAN_NOT_BE_EMPTY);
        getLocalStorage().setItem(key, value);
    }

    static getLCS(key: string): string | null {
        if (key === '')
            throw new Error(AppExeption.LOCAL_STORAGE_KEY_CAN_NOT_BE_EMPTY);
        return getLocalStorage().getItem(key);
    }

    static genImgSrc(id: string, size: ImageQuality): string {
        if (id === '')
            throw new Error(AppExeption.IMAGE_ID_CAN_NOT_BE_EMPTY);
        return `${AppConfig.BASE_IMAGE_URL}${size}/${id}`;
    }

    static capitalizeWords(text: string): string {
        return text.replace(/\w\S*/g, txt => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}
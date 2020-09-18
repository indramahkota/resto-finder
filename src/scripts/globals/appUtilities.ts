import man from '../../assets/images/avatars/man.svg';
import man1 from '../../assets/images/avatars/man1.svg';
import woman from '../../assets/images/avatars/woman.svg';
import woman1 from '../../assets/images/avatars/woman1.svg';

const arrAvatars = [man, man1, woman, woman1];

export default class Utils {
    static setLCS(key: string, value: string): void {
        window.localStorage.setItem(key, value);
    }

    static getLCS(key: string): string | null {
        return window.localStorage.getItem(key);
    }

    static randAvatar(): string {
        return arrAvatars[Math.floor(Math.random() * arrAvatars.length)]
    }
}
import { INavigation } from '../interfaces/interfaces';
import heroImageUrl from '../../assets/images/heros/hero-image.jpg';

export default class AppConfig {
    static APP_NAME: string = 'Ponti Resto Finder';
    static APP_HERO_IMAGE: string = heroImageUrl;
    static TEXT_GREETING: string = 'Selamat Datang!';

    static LCS_THEME: string = 'ponti-resto-finder-indramahkota-theme-mode';
    static LCS_DRAWER: string = 'ponti-resto-finder-indramahkota-drawer-mode';

    static APP_NAV_DATA: INavigation[] = [
        { name: "Find Resto", url: "#find" },
        { name: "My Favorites", url: "#my" },
        { name: "Developer", url: "#indramahkota" }
    ];

    static SUPPORT_DARK_MODE: boolean = true;
}
/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 20:34:28
 * @modify date 2020-09-01 20:37:36
 * @desc [description]
 */

import { INavigation, ISocialMedia } from '../interfaces/interfaces';
import devImageUrl from '../../assets/images/profile.webp';
import devImageUrlRound from '../../assets/images/profile-round-60.webp';
import heroImageUrl from '../../assets/images/heros/hero-image.webp';

export default class AppConfig {
    static readonly APP_NAME: string = 'Resto Finder';
    static readonly APP_HERO_IMAGE: string = heroImageUrl;
    static readonly TEXT_GREETING: string = 'Selamat Datang!';
    static readonly TEXT_FOOTER: string = 'Copyright © 2020 Resto Finder. All rights reserved.';

    static readonly DEV_NAME: string = 'Indra Mahkota';
    static readonly DEV_LOCATION: string = 'Pontianak, Indonesia';
    static readonly DEV_HIRABLE: string = 'Yes';
    static readonly DEV_IMAGE: string = devImageUrl;
    static readonly DEV_IMAGE_ROUND: string = devImageUrlRound;

    static readonly LCS_THEME: string = 'resto-finder-indramahkota-theme-mode';
    static readonly LCS_DRAWER: string = 'resto-finder-indramahkota-drawer-mode';

    static readonly APP_NAV_DATA: INavigation[] = [
        { name: 'Find Resto', url: '#find', isActive: false },
        { name: 'My Favorites', url: '#my', isActive: false }
    ];

    static readonly APP_SOCIAL_MEDIA: ISocialMedia[] = [
        { name: 'github', url: 'https://github.com/indramahkota', isEmail: false, color: '#333', icon: 'fab fa-github' },
        { name: 'linkedin', url: 'https://www.linkedin.com/in/indramahkota', isEmail: false, color: '#0e76a8', icon: 'fab fa-linkedin-in' },
        { name: 'google', url: 'mailto:indramahkota1@gmail.com', isEmail: true, color: '#ea4335',  icon: 'fab fa-google' },
        { name: 'gitlab', url: 'https://gitlab.com/indramahkota', isEmail: false, color: '#fca326', icon: 'fab fa-gitlab' },
        { name: 'facebook', url: 'https://www.facebook.com/indramahkota.id', isEmail: false, color: '#3b5998', icon: 'fab fa-facebook-f' }
    ];

    static readonly SUPPORT_DARK_MODE: boolean = true;

    static readonly JSON_RESTO_DATA_URL: string = './static/data/restodata.json';
}
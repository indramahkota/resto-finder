/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 20:34:28
 * @modify date 2020-09-01 20:37:36
 * @desc [description]
 */

import { INavigation, ISosialMedia } from '../interfaces/interfaces';
import heroImageUrl from '../../assets/images/heros/hero-image.jpg';

export default class AppConfig {
    static readonly APP_NAME: string = 'Resto Finder';
    static readonly APP_HERO_IMAGE: string = heroImageUrl;
    static readonly TEXT_GREETING: string = 'Selamat Datang!';
    static readonly TEXT_FOOTER: string = 'Copyright © 2020 Resto Finder. All rights reserved.';

    static readonly LCS_THEME: string = 'resto-finder-indramahkota-theme-mode';
    static readonly LCS_DRAWER: string = 'resto-finder-indramahkota-drawer-mode';

    static readonly APP_NAV_DATA: INavigation[] = [
        { name: 'Find Resto', url: '#find' },
        { name: 'My Favorites', url: '#my' },
        { name: 'Developer', url: '#indramahkota' }
    ];

    static readonly APP_SOSIAL_MEDIA: ISosialMedia[] = [
        { name: 'Github', url: 'https://github.com/indramahkota', isEmail: false, icon: 'fab fa-github' },
        { name: 'Linkedin', url: 'https://www.linkedin.com/in/indramahkota', isEmail: false, icon: 'fab fa-linkedin-in' },
        { name: 'Gmail', url: 'indramahkota1@gmail.com', isEmail: true, icon: 'fab fa-google' },
        { name: 'Gitlab', url: 'https://gitlab.com/indramahkota', isEmail: false, icon: 'fab fa-gitlab' },
        { name: 'Facebook', url: 'https://www.facebook.com/indramahkota.id', isEmail: false, icon: 'fab fa-facebook-f' }
    ];

    static readonly SUPPORT_DARK_MODE: boolean = true;
}
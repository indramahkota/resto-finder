/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 20:34:28
 * @modify date 2020-09-01 20:37:36
 * @desc [description]
 */

import { INavigation, ISocialMedia } from '../interfaces/interfaces';
import devImageUrl from '../../assets/images/profile.webp';
import heroImageUrl from '../../assets/images/heros/hero-image.webp';

import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faGoogle, faGitlab, faFacebookF } from '@fortawesome/free-brands-svg-icons';
library.add(faMapMarkerAlt, faGithub, faLinkedinIn, faGoogle, faGitlab, faFacebookF);

export default class AppConfig {
    static readonly APP_NAME: string = 'Resto Finder';
    static readonly APP_HERO_IMAGE: string = heroImageUrl;
    static readonly TEXT_GREETING: string = 'Selamat Datang!';
    static readonly TEXT_FOOTER: string = 'Copyright © 2020 Resto Finder. All rights reserved.';

    static readonly DEV_NAME: string = 'Indra Mahkota';
    static readonly DEV_LOCATION: string = 'Pontianak, Indonesia';
    static readonly DEV_HIRABLE: string = 'Yes';
    static readonly DEV_IMAGE: string = devImageUrl;

    static readonly LCS_THEME: string = 'resto-finder-indramahkota-theme-mode';
    static readonly LCS_DRAWER: string = 'resto-finder-indramahkota-drawer-mode';

    static readonly APP_NAV_DATA: INavigation[] = [
        { name: 'Find Resto', url: '#find', isActive: false },
        { name: 'My Favorites', url: '#my', isActive: false },
        { name: 'Developer', url: '#indramahkota', isActive: false }
    ];

    static readonly APP_SOCIAL_MEDIA: ISocialMedia[] = [
        { name: 'github', url: 'https://github.com/indramahkota', isEmail: false, color: '#333', icon: icon({ prefix: 'fab', iconName: 'github' }) },
        { name: 'linkedin', url: 'https://www.linkedin.com/in/indramahkota', isEmail: false, color: '#0e76a8', icon: icon({ prefix: 'fab', iconName: 'linkedin-in' }) },
        { name: 'google', url: 'mailto:indramahkota1@gmail.com', isEmail: true, color: '#ea4335',  icon: icon({ prefix: 'fab', iconName: 'google' }) },
        { name: 'gitlab', url: 'https://gitlab.com/indramahkota', isEmail: false, color: '#fca326', icon: icon({ prefix: 'fab', iconName: 'gitlab' }) },
        { name: 'facebook', url: 'https://www.facebook.com/indramahkota.id', isEmail: false, color: '#3b5998', icon: icon({ prefix: 'fab', iconName: 'facebook-f' }) }
    ];

    static readonly SUPPORT_DARK_MODE: boolean = true;
}
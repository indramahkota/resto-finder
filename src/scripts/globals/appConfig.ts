import { IIconNavigation, INavigation, ISocialMedia, IUser } from '../interfaces/interfaces';
import userImageUrl from '../../assets/images/profile.webp';
import userImageUrlRound from '../../assets/images/profile-round-60.webp';
import loadingImageSvgUrl from '../../assets/images/loading.svg';

export default class AppConfig {
    static readonly APP_NAME: string = 'Resto Finder';
    static readonly TEXT_GREETING: string = 'Selamat Datang';
    static readonly TEXT_FOOTER: string = 'Copyright © 2020 Resto Finder. All rights reserved.';

    static readonly LCS_THEME: string = 'resto-finder-indramahkota-theme-mode';
    static readonly LCS_DRAWER: string = 'resto-finder-indramahkota-drawer-mode';

    static readonly URL_LOADING_SVG = loadingImageSvgUrl;
    static readonly BASE_URL:string = 'https://dicoding-restaurant-api.el.r.appspot.com/';
    static readonly BASE_IMAGE_URL:string = 'https://dicoding-restaurant-api.el.r.appspot.com/images/small/';

    static readonly STATIC_USER: IUser = {
        name: 'Indra Mahkota',
        status: 'Open for opportunities: Yes',
        location: 'Pontianak, Indonesia',
        image: userImageUrl,
        roundImage: userImageUrlRound
    }

    static readonly APP_NAVIGATION: INavigation[] = [
        { name: 'Find Resto', url: '#/home', isActive: true },
        { name: 'My Favorites', url: '#/favorites', isActive: false }
    ];

    static readonly APP_ICON_NAVIGATION: IIconNavigation = {
        name: 'Indra Mahkota',
        url: '#/user',
        isActive: false,
        imageUrl: userImageUrlRound,
        imageAlt: 'User Name Indra Mahkota'
    }

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
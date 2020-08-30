import HERO_IMAGE_URL from '../../assets/images/heros/hero-image.jpg';

const NAV_DATA = [
    { name: "Find Resto", url: "#find" },
    { name: "My Favorites", url: "#my" },
    { name: "Developers", url: "#indramahkota" }
]

const AppConfig = {
    APP_NAME: 'Ponti Resto Finder',
    TEXT_GREETING: 'Selamat Datang!',
    APP_HERO_IMAGE: HERO_IMAGE_URL,
    APP_NAV_DATA: NAV_DATA,
    LOCAL_STORAGE_NAME_FOR_THEME: 'ponti-resto-finder-indramahkota-theme-mode',
    LOCAL_STORAGE_NAME_FOR_DRAWER: 'ponti-resto-finder-indramahkota-drawer-mode'
};

export default AppConfig;

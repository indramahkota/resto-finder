import HERO_IMAGE_URL from '../../assets/images/heros/hero-image.jpg';

const NAV_DATA = [
    { name: "Find Resto", url: "#find" },
    { name: "Our Suggestion", url: "#suggestion" },
    { name: "My Favorites", url: "#my" }
]

const AppConfig = {
    APP_NAME: 'Ponti Resto Finder',
    APP_HERO_IMAGE: HERO_IMAGE_URL,
    APP_NAV_DATA: NAV_DATA,
    THEME_LOCAL_STORAGE_NAME: 'ponti-resto-finder-indramahkota-theme-mode'
};

export default AppConfig;

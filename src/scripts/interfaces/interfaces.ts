export interface Navigation {
    name: string;
    url: string;
    isActive: boolean;
}

export interface IconNavigation extends Navigation {
    imageUrl: string;
    imageAlt: string;
}

export interface User {
    name: string;
    status: string;
    location: string;
    image: string;
    roundImage: string;
}

export interface SocialMedia {
    name: string;
    url: string;
    icon: string;
    color: string;
    isEmail: boolean;
}
import { Icon } from "@fortawesome/fontawesome-svg-core";

export interface INavigation {
    name: string,
    url: string,
    isActive: boolean
}

export interface ISocialMedia {
    name: string,
    url: string,
    icon: Icon,
    color: string,
    isEmail: boolean
}

export interface IRestaurant {
    id: string,
    name: string,
    description: string,
    pictureId: string,
    city: string,
    rating: number
}

export interface IRestaurants {
    restaurants: IRestaurant[];
}
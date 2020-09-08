export interface INavigation {
    name: string,
    url: string,
    isActive: boolean
}

export interface IIconNavigation extends INavigation {
    imageUrl: string,
    imageAlt: string
}

export interface IUser {
    name: string,
    status: string
    location: string,
    image: string,
    roundImage: string
}

export interface ISocialMedia {
    name: string,
    url: string,
    icon: string,
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
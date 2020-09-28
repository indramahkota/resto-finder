import { Category, ConsumerReview, Drink, Food, Menus, Restaurant, RestaurantDetails } from '../../../src/scripts/data/entity/RestaurantEntity';
import { RestaurantDetailsResponse, RestaurantResponse } from '../../../src/scripts/data/entity/RestaurantResponse';
import { CustomerReviewResponse } from '../../../src/scripts/data/entity/CustomerReviewResponse';
import { CustomerReview } from '../../../src/scripts/data/entity/CustomerReviewEntity';

export function generateFakeRestaurant(): Restaurant {
    return {
        id: '36fa3p5gw45kfhujxow',
        name: 'Gigitan Cepat',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.',
        pictureId: '32',
        city: 'Bandung',
        rating: 4.4,
        isFavorite: false
    };
}

export function generateFakeRestaurantList(): Restaurant[] {
    return [
        {
            id: '36fa3p5gw45kfhujxow',
            name: 'Gigitan Cepat',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.',
            pictureId: '32',
            city: 'Bandung',
            rating: 4.4,
            isFavorite: false
        },
        {
            id: '6m4lseiku64kfhujxow',
            name: 'Kafe Cemara',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.',
            pictureId: '24',
            city: 'Samarinda',
            rating: 3.9,
            isFavorite: false
        },
        {
            id: 'kh9w7dl4dikkfhujxow',
            name: 'Ampiran Kota',
            description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.',
            pictureId: '34',
            city: 'Samarinda',
            rating: 5,
            isFavorite: false
        }
    ];
}

export function generateFakeRestaurantResponse(): RestaurantResponse {
    return {
        error: false,
        message: 'success',
        count: 3,
        restaurants: generateFakeRestaurantList()
    };
}

export function generateFakeCategoryList(): Category[] {
    return [
        { name: 'Bali' },
        { name: 'Jawa' },
        { name: 'Kalimantan' }
    ];
}

export function generateFakeFoodList(): Food[] {
    return [
        { name: 'Nasi Goreng' },
        { name: 'Bubur Pedas' },
        { name: 'Sate Ayam' }
    ];
}

export function generateFakeDrinkList(): Drink[] {
    return [
        { name: 'Cendol Dawet' },
        { name: 'Extra Joss' },
        { name: 'Tes Es' }
    ];
}

export function generateFakeMenus(): Menus {
    return {
        foods: generateFakeFoodList(),
        drinks: generateFakeDrinkList()
    };
}

export function generateFakeConsumerReviewList(): ConsumerReview[] {
    return [
        {
            name: 'Buchori',
            review: 'Harganya murah sekali!',
            date: '13 November 2019'
        },
        {
            name: 'Ahmad',
            review: 'Saya sangat suka menu malamnya!',
            date: '13 November 2019'
        },
        {
            name: 'Postman 2',
            review: 'yuhu',
            date: '25 September 2020'
        }
    ];
}

export function generateFakeRestaurantDetails(): RestaurantDetails {
    return {
        id: '36fa3p5gw45kfhujxow',
        name: 'Gigitan Cepat',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.',
        pictureId: '32',
        city: 'Bandung',
        rating: 4.4,
        isFavorite: false,
        address: 'Jln. Pandeglang no 19',
        categories: generateFakeCategoryList(),
        menus: generateFakeMenus(),
        consumerReviews: generateFakeConsumerReviewList()
    };
}

export function generateFakeRestaurantDetailsResponse(): RestaurantDetailsResponse {
    return {
        error: false,
        message: 'success',
        restaurant: generateFakeRestaurantDetails()
    };
}

export function generateFakeRestaurantDetailsList(): RestaurantDetails[] {
    return [
        {
            id: 'w029d674m9kflb9aln',
            name: 'Pangsit Express',
            description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.',
            pictureId: '24',
            city: 'Semarang',
            rating: 4.8,
            isFavorite: true,
            address: 'Jln. Pandeglang no 19.',
            categories: generateFakeCategoryList(),
            menus: generateFakeMenus(),
            consumerReviews: generateFakeConsumerReviewList()
        },
        {
            id: '36fa3p5gw45kfhujxow',
            name: 'Gigitan Cepat',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.',
            pictureId: '32',
            city: 'Bandung',
            rating: 4.4,
            isFavorite: true,
            address: 'Jln. Pandeglang no 19',
            categories: generateFakeCategoryList(),
            menus: generateFakeMenus(),
            consumerReviews: generateFakeConsumerReviewList()
        },
        {
            id: 'rnw5ppceixkflb9aln',
            name: 'Rumah Senja',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.',
            pictureId: '32',
            city: 'Jakarta',
            rating: 4.5,
            isFavorite: true,
            address: 'Jln. Pandeglang no 19',
            categories: generateFakeCategoryList(),
            menus: generateFakeMenus(),
            consumerReviews: generateFakeConsumerReviewList()
        }
    ];
}

export function generateFakeCustomerReview(): CustomerReview {
    return {
        id: '36fa3',
        name: 'Buchori',
        review: 'Harganya murah sekali!',
        date: '13 November 2019'
    }
}

export function generateFakeCustomerReviewList(): CustomerReview[] {
    return [
        {
            id: '36fa3',
            name: 'Buchori',
            review: 'Harganya murah sekali!',
            date: '13 November 2019'
        },
        {
            id: 'p5gw4',
            name: 'Ahmad',
            review: 'Saya sangat suka menu malamnya!',
            date: '13 November 2019'
        },
        {
            id: '5kfhu',
            name: 'Postman 2',
            review: 'yuhu',
            date: '25 September 2020'
        }
    ];
}

export function generateFakeCustomerReviewResponse(): CustomerReviewResponse {
    return {
        error: false,
        message: 'success',
        customerReviews: generateFakeCustomerReviewList()
    };
}
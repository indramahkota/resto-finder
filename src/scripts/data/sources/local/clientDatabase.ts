import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { RestaurantDetails } from '../../entity/RestaurantEntity';

interface RestoDatabase extends DBSchema {
    restaurants: {
        key: string;
        value: RestaurantDetails;
        indexes: { 'by-id': string, 'by-city': string, 'by-rating': number };
    };
}

async function Database(): Promise<IDBPDatabase<RestoDatabase>> {
    return await openDB<RestoDatabase>('resto-finder-database', 1, {
        upgrade: db => {
            const restaurants = db.createObjectStore('restaurants', { keyPath: 'id' });
            restaurants.createIndex('by-id', 'id');
            restaurants.createIndex('by-city', 'city');
            restaurants.createIndex('by-rating', 'rating');
        }
    });
}

export default class ClientDatabase {
    async putRestaurant(data: RestaurantDetails): Promise<string> {
        const db = await Database();
        return await db.put('restaurants', data);
    }

    async getRestaurant(id: string): Promise<RestaurantDetails | undefined> {
        const db = await Database();
        return await db.get('restaurants', id);
    }

    async getAllRestaurant(): Promise<RestaurantDetails[]> {
        const db = await Database();
        return await db.getAll('restaurants');
    }

    async deleteRestaurant(id: string): Promise<void> {
        const db = await Database();
        return await db.delete('restaurants', id);
    }
}
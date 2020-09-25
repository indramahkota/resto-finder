import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { RestaurantDetails } from '../../entity/RestaurantEntity';

interface RestoDatabase extends DBSchema {
    restaurants: {
        value: RestaurantDetails;
        key: string;
        indexes: { 'by-id': string, 'by-city': string, 'by-rating': number };
    };
}

export async function Database(): Promise<IDBPDatabase<RestoDatabase>> {
    return await openDB<RestoDatabase>('resto-finder-database', 1, {
        upgrade: db => {
            const restaurants = db.createObjectStore('restaurants', { keyPath: 'id' });
            restaurants.createIndex('by-id', 'id');
            restaurants.createIndex('by-city', 'city');
            restaurants.createIndex('by-rating', 'rating');
        }
    });
}
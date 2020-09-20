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
            const store = db.createObjectStore('restaurants', { keyPath: 'id' });
            store.createIndex('by-id', 'id');
            store.createIndex('by-city', 'city');
            store.createIndex('by-rating', 'rating');
        }
    });
}
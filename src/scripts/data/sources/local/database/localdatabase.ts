import { openDB, DBSchema } from "idb";
import { Restaurant } from "../../../entity/RestaurantEntity";

interface RestoDatabase extends DBSchema {
    restaurants: {
        value: Restaurant;
        key: string;
        indexes: { 'by-id': string, 'by-city': string, 'by-rating': number };
    };
}

const getDatabase = async () => {
    return await openDB<RestoDatabase>("resto-finder-database", 1, {
        upgrade: db => {
            const store = db.createObjectStore("restaurants", { keyPath: "id" });
            store.createIndex("by-id", "id");
            store.createIndex("by-city", "city");
            store.createIndex("by-rating", "rating");
        }
    });
}

export default class LocalDatabase {
    static async createFavorite(data: Restaurant): Promise<string> {
        const db = await getDatabase();
        return await db.add("restaurants", data);
    }

    static async getFavoriteById(id: string): Promise<Restaurant | undefined> {
        const db = await getDatabase();
        return await db.get("restaurants", id);
    }

    static async getAllFavorite(): Promise<Restaurant[]> {
        const db = await getDatabase();
        return await db.getAll("restaurants");
    }

    static async updateFavorite(data: Restaurant): Promise<string> {
        const db = await getDatabase();
        return await db.put("restaurants", data);
    }

    static async deleteFavorite(id: string): Promise<void> {
        const db = await getDatabase();
        return await db.delete("restaurants", id);
    }
}
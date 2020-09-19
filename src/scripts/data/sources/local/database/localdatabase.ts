import { openDB, DBSchema } from "idb";
import { RestaurantDetails } from "../../../entity/RestaurantEntity";

interface RestoDatabase extends DBSchema {
    restaurants: {
        value: RestaurantDetails;
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
    static async createFavorite(data: RestaurantDetails): Promise<string> {
        const db = await getDatabase();
        return await db.add("restaurants", data);
    }

    static async getFavoriteById(id: string): Promise<RestaurantDetails | undefined> {
        const db = await getDatabase();
        return await db.get("restaurants", id);
    }

    static async getAllFavorite(): Promise<RestaurantDetails[]> {
        const db = await getDatabase();
        return await db.getAll("restaurants");
    }

    static async updateFavorite(data: RestaurantDetails): Promise<string> {
        const db = await getDatabase();
        return await db.put("restaurants", data);
    }

    static async deleteFavorite(id: string): Promise<void> {
        const db = await getDatabase();
        return await db.delete("restaurants", id);
    }
}
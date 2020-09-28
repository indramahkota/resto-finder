import AppRepository from '../../src/scripts/data/appRepository';
import ClientDatabase from '../../src/scripts/data/sources/local/clientDatabase';
import NetworkServer from '../../src/scripts/data/sources/network/networkServer';
import { generateFakeCustomerReview, generateFakeRestaurantDetails, generateFakeRestaurantDetailsList } from './mock/FakeData';

describe('Put a Favorite Restaurant', () => {
    it('should put a favorite restaurant correctly', async () => {
        const networkServer = new NetworkServer();
        const clientDatabase = new ClientDatabase();
        const repository = new AppRepository(networkServer, clientDatabase);

        const getData = spyOn(clientDatabase, 'putRestaurant').and.callFake(
            async () => generateFakeRestaurantDetails().id
        );

        const id = await repository.putFavorite(generateFakeRestaurantDetails());
        expect(getData).toHaveBeenCalled();
        expect(id).toEqual('36fa3p5gw45kfhujxow');
    });
});

describe('Get A Favorite Restaurant', () => {
    it('should return a single restaurant correctly', async () => {
        const networkServer = new NetworkServer();
        const clientDatabase = new ClientDatabase();
        const repository = new AppRepository(networkServer, clientDatabase);

        const getData = spyOn(clientDatabase, 'getRestaurant').and.callFake(
            async () => generateFakeRestaurantDetails()
        );

        const data = await repository.getFavoriteById(generateFakeRestaurantDetails().id);
        expect(getData).toHaveBeenCalled();
        expect(data).toEqual(generateFakeRestaurantDetails());
    });

    it('should return undefined when no data written before', async () => {
        const networkServer = new NetworkServer();
        const clientDatabase = new ClientDatabase();
        const repository = new AppRepository(networkServer, clientDatabase);

        const getData = spyOn(clientDatabase, 'getRestaurant').and.callFake(
            async () => undefined
        );

        const data = await repository.getFavoriteById('36fa3p5gw45kfhujxow');
        expect(getData).toHaveBeenCalled();
        expect(data).toEqual(undefined);
    });
});

describe('Get All Favorite Restaurants', () => {
    it('should return all favorite restaurants correctly', async () => {
        const networkServer = new NetworkServer();
        const clientDatabase = new ClientDatabase();
        const repository = new AppRepository(networkServer, clientDatabase);

        const getData = spyOn(clientDatabase, 'getAllRestaurant').and.callFake(
            async () => generateFakeRestaurantDetailsList()
        );

        const data = await repository.getAllFavorites();
        expect(getData).toHaveBeenCalled();
        expect(data).toEqual(generateFakeRestaurantDetailsList());
        expect(true).toEqual(generateFakeRestaurantDetailsList()[0].isFavorite);
    });

    it('should return empty array if there no favorite restaurant', async () => {
        const networkServer = new NetworkServer();
        const clientDatabase = new ClientDatabase();
        const repository = new AppRepository(networkServer, clientDatabase);

        const getData = spyOn(clientDatabase, 'getAllRestaurant').and.callFake(
            async () => []
        );

        const data = await repository.getAllFavorites();
        expect(getData).toHaveBeenCalled();
        expect(data).toEqual([]);
    });
});

describe('Delete favorite restaurant', () => {
    it('should delete restaurant from database correctly', async () => {
        const networkServer = new NetworkServer();
        const clientDatabase = new ClientDatabase();
        const repository = new AppRepository(networkServer, clientDatabase);

        const getData = spyOn(clientDatabase, 'deleteRestaurant');

        await repository.deleteFavorite('36fa3p5gw45kfhujxow');
        expect(getData).toHaveBeenCalledWith('36fa3p5gw45kfhujxow');
    });
});

describe('Get All Restaurants', () => {
    it('should return all restaurants', async () => {
        const networkServer = new NetworkServer();
        const clientDatabase = new ClientDatabase();
        const repository = new AppRepository(networkServer, clientDatabase);

        const getData = spyOn(networkServer, 'get');

        await repository.getAllRestaurants();
        expect(getData).toHaveBeenCalled();
    });
});

describe('Get Restaurant Details', () => {
    it('should return all restaurants', async () => {
        const networkServer = new NetworkServer();
        const clientDatabase = new ClientDatabase();
        const repository = new AppRepository(networkServer, clientDatabase);

        const getData = spyOn(networkServer, 'get');

        await repository.getRestaurantDetails('36fa3p5gw45kfhujxow');
        expect(getData).toHaveBeenCalled();
    });
});

describe('Post Restaurant Review', () => {
    it('should return all restaurants', async () => {
        const networkServer = new NetworkServer();
        const clientDatabase = new ClientDatabase();
        const repository = new AppRepository(networkServer, clientDatabase);

        const getData = spyOn(networkServer, 'post');

        await repository.postRestaurantReview(generateFakeCustomerReview());
        expect(getData).toHaveBeenCalled();
    });
});

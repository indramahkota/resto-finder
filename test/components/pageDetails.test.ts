import TestUtils from "../utilities/CustomelementTestUtilities";
import { generateFakeRestaurantDetails, generateFakeRestaurantDetailsResponse } from "../data/mock/FakeData";
import PageDetails from "../../src/scripts/views/pageDetails";

describe('Page Details', async () => {
    let root: HTMLElement;

    beforeEach(async () => {
        root = await TestUtils.render('rstf-details', {
            detailsId: generateFakeRestaurantDetails().id
        });
        await (root as PageDetails).setRestaurantDetailsData(generateFakeRestaurantDetailsResponse());
    });

    it('should render page details correctly', async () => {
        expect(root.innerHTML.includes("Gigitan Cepat")).toBeTruthy();
        expect(root.innerHTML.includes("Bandung")).toBeTruthy();
        expect(root.innerHTML.includes("Jln. Pandeglang no 19")).toBeTruthy();
        expect(root.innerHTML.includes("Harganya murah sekali!")).toBeTruthy();
        expect(root.innerHTML.includes("Saya sangat suka menu malamnya!")).toBeTruthy();
        expect(root.innerHTML.includes("Yuhu im ready")).toBeTruthy();
        expect(root.innerHTML.includes("Kalimantan")).toBeTruthy();
        expect(root.innerHTML.includes("Bubur Pedas")).toBeTruthy();
        expect(root.innerHTML.includes("Extra Joss")).toBeTruthy();
    });

    it('should render shimmer when detailsId value equal to null', async () => {
        (root as PageDetails).setRestaurantDetailsData(null);
        await (root as PageDetails).updateComplete;
        expect(root.querySelector('detailscard-shimmer')).toBeTruthy();
    });

    it('should show the Add this Restaurant into favorites button when the Restaurant has not been add before', async () => {
        expect(root.querySelector('[aria-label="Add this Restaurant into favorites"]')).toBeTruthy();
    });

    it('should show the Remove this Restaurant into favorites button when the Restaurant has added to database', async () => {
        const elementAdd = root.querySelector('[aria-label="Add this Restaurant into favorites"]');
        elementAdd.dispatchEvent(new Event('click'));

        await (root as PageDetails).updateComplete;
        expect(root.querySelector('[aria-label="Remove this Restaurant from favorites"]')).toBeTruthy();
    });

    it('should show the Add this Restaurant into favorites button when the Restaurant has added to database and deleted again', async () => {
        const elementAdd = root.querySelector('[aria-label="Add this Restaurant into favorites"]');
        elementAdd.dispatchEvent(new Event('click'));

        await (root as PageDetails).updateComplete;
        expect(root.querySelector('[aria-label="Remove this Restaurant from favorites"]')).toBeTruthy();

        elementAdd.dispatchEvent(new Event('click'));
        
        await (root as PageDetails).updateComplete;
        expect(root.querySelector('[aria-label="Add this Restaurant into favorites"]')).toBeTruthy();
    });
});
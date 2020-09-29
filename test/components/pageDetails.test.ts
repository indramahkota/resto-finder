import TestUtils from "../utilities/CustomelementTestUtilities";
import { generateFakeRestaurantDetails, generateFakeRestaurantDetailsResponse } from "../data/mock/FakeData";
import PageDetails from "../../src/scripts/views/pageDetails";

describe('Add Restaurant To Client Database Favorites', async () => {
    let root: HTMLElement;

    beforeEach(async () => {
        root = await TestUtils.render('rstf-details', {
            detailsId: generateFakeRestaurantDetails().id
        });
        await (root as PageDetails).setRestaurantDetailsData(generateFakeRestaurantDetailsResponse());
        await (root as PageDetails).setConsumerReviewListData(generateFakeRestaurantDetailsResponse().restaurant.consumerReviews);
    });

    it('should show the like button when the movie has not been liked before', async () => {
        expect(root.innerHTML.includes("Gigitan Cepat")).toBeTruthy();
    });
});
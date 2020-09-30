/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const assert = require('assert');

Feature('pageDetails');

Before((I) => {
    I.amOnPage('/#/home');
});

Scenario('show same restaurant name', async (I) => {
    I.seeElement('#find-button');
    I.click('#find-button');
    I.seeElement('#top-resto');

    const firstRestaurant = locate('.card__container a').first();
    const firstTitleElement = locate('.card__name').first();
    const firstRestaurantTitleText = await I.grabTextFrom(firstTitleElement);
    I.click(firstRestaurant);

    I.seeElement('.restodetails__content');
    const detailTitleElement = locate('.restodetails__part1 table tbody tr td p b').first();
    const detailTitleText = await I.grabTextFrom(detailTitleElement);

    assert.strictEqual(firstRestaurantTitleText, detailTitleText);
});

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const assert = require('assert');

Feature('pageDetails');

Before((I) => {
    I.amOnPage('/#/home');

    //Apakah find button di homepage tampil/visible?
    I.seeElement('#find-button');

    //Klik find button!
    I.click('#find-button');

    //Apakah top resto di homepage tampil/visible?
    I.seeElement('#top-resto');
});

Scenario('Show same restaurant name', async (I) => {
    //Ambil restoran pertama!
    const firstRestaurant = locate('.card__container a').first();

    //Ambil nama restoran pada resto card
    const firstTitleElement = locate('.card__name').first();
    const firstRestaurantTitleText = await I.grabTextFrom(firstTitleElement);

    //Klik restoran pertama!
    I.click(firstRestaurant);

    //Apakah element di page details tampil/visible?
    I.seeElement('.pagedetails__container');
    I.seeElement('.pagedetails__detailscard');
    I.seeElement('.restodetails__container');
    I.seeElement('.restodetails__content');

    //Ambil nama restoran pertama di page details!
    const detailTitleElement = locate('.restodetails__part1 table tbody tr td p b').first();
    const detailTitleText = await I.grabTextFrom(detailTitleElement);

    //Apakah nama masih sama?
    assert.strictEqual(firstRestaurantTitleText, detailTitleText);
});

Scenario('Add then remove the restaurant from favorite', async (I) => {
    //Ambil restoran pertama!
    const firstRestaurant = locate('.card__container a').first();

    //Klik restoran pertama!
    I.click(firstRestaurant);

    //Apakah element di page details tampil/visible?
    I.seeElement('.pagedetails__container');
    I.seeElement('.pagedetails__reviewcard');
    I.seeElement('.favorite__button');

    //Ambil button favorit!
    const firstButton = locate('.pagedetails__container .pagedetails__reviewcard .favorite__button').first();

    //Ambil aria label!
    let favoriteButtonLabelText = await I.grabAttributeFrom(firstButton, 'aria-label');

    //Apakah label = Add this Restaurant into favorites?
    assert.strictEqual(favoriteButtonLabelText, 'Add this Restaurant into favorites');

    //Klik button favorite!
    //Menambahkan restoran ini di favorite
    I.click(firstButton);

    //Ambil aria label!
    favoriteButtonLabelText = await I.grabAttributeFrom(firstButton, 'aria-label');

    //Apakah label = Remove this Restaurant from favorites?
    assert.strictEqual(favoriteButtonLabelText, 'Remove this Restaurant from favorites');

    //Klik button favorite!
    //Menghapus restoran ini dari favorite
    I.click(firstButton);

    //Ambil aria label!
    favoriteButtonLabelText = await I.grabAttributeFrom(firstButton, 'aria-label');

    //Apakah laber = Add this Restaurant into favorites?
    assert.strictEqual(favoriteButtonLabelText, 'Add this Restaurant into favorites');
});

Scenario('Add restaurant review ', async (I) => {
    //Ambil restoran pertama!
    const firstRestaurant = locate('.card__container a').first();

    //Klik restoran pertama!
    I.click(firstRestaurant);

    //Apakah element di page details tampil/visible?
    I.seeElement('.pagedetails__container');
    I.seeElement('.pagedetails__reviewcard');

    //Scroll to review container
    I.scrollTo('.reviewform__container');

    //Apakah element tampil/visible?
    I.seeElement('#review-input');
    I.seeElement('#review-textarea');

    //Fokus dan tulis ke element!
    const nameInput = locate('#review-input').first();
    I.click(nameInput);
    I.type('Codecept Type');

    //Fokus dan tulis ke element!
    const reviewInput = locate('#review-textarea').first();
    I.click(reviewInput);
    I.type('This review from Codecept');

    //Ambil submit button
    const submitButton = locate('.reviewbutton__submit').first();

    //Klik submit
    I.click(submitButton);

    pause();
});
import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty, property } from 'lit-element';

import Repository from '../data/repository';
import EventType from '../globals/eventType';
import { RestaurantDetailsResponse } from '../data/entity/RestaurantResponse';
import CommonElement from '../_library_/components/_base_/commonElement';
import { CustomerReview } from '../data/entity/CustomerReviewEntity';

import '../_library_/components/details-card/detailsCard';
import '../_library_/containers/review-container/reviewContainer';
import '../_library_/components/review-form/reviewForm';
import '../_library_/components/favorite-button/favoriteButton';
import '../_library_/components/detailscard-shimmer/detailsCardShimmer';

import './page-details.scss';

@customElement('rstf-details')
export default class PageDetails extends CommonElement {
    @property({ type: String, attribute: true })
    detailsId: string | null = null;

    @internalProperty()
    private _restoData: RestaurantDetailsResponse | null = null;

    @internalProperty()
    private _isFavorite = false;

    private _addOrRemoveFavoriteHandler = async (event: Event) => {
        const details = (event as CustomEvent).detail;
        if (this.detailsId !== null && this._isFavorite && !details.data) {
            try {
                await Repository.deleteFavorite(this.detailsId);
                this._isFavorite = false;
                this._dispatchData({ message: `Remove ${this._restoData?.restaurant.name} from favorite` }, EventType.SHOW_TOAST);
            } catch (error) {
                this._dispatchData({ message: error }, EventType.SHOW_TOAST);
            }
        } else if (this._restoData?.restaurant !== undefined && !this._isFavorite && details.data) {
            try {
                await Repository.createFavorite(Object.assign(this._restoData.restaurant, { isFavorite: true }));
                this._isFavorite = true;
                this._dispatchData({ message: `Add ${this._restoData?.restaurant.name} to favorite` }, EventType.SHOW_TOAST);
            } catch (error) {
                this._dispatchData({ message: error }, EventType.SHOW_TOAST);
            }
        } else {
            this._dispatchData({ message: 'Something happen when add to favorite' }, EventType.SHOW_TOAST);
        }
    }

    private _submitReviewHandler = async (event: Event) => {
        if (this.detailsId === null)
            return;

        const details = (event as CustomEvent).detail;
        const customerReview: CustomerReview = {
            id: this.detailsId,
            name: details.name,
            review: details.review,
            date: Date.now().toString() //Maybe tidak diperhitungkan datanya saat post
        }

        try {
            await Repository.postRestaurantReview(customerReview);
            await this._getRestaurantDetailsData(this.detailsId);
            this._dispatchData({ message: 'Submit review success' }, EventType.SHOW_TOAST);
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    private async _getRestaurantDetailsData(id: string | null) {
        if (id === null)
            return;
        try {
            const restoData = await Repository.getRestaurantDetails(id);
            this._restoData = restoData;
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    private async _getFavoriteData(id: string | null) {
        if (id === null)
            return;
        try {
            const favoriteData = await Repository.getFavoriteById(id);
            if (favoriteData !== undefined)
                this._isFavorite = true;
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(EventType.FAVORITE_CLICKED, this._addOrRemoveFavoriteHandler, false);
        this.addEventListener(EventType.SUBMIT_REVIEW, this._submitReviewHandler, false);

        document.body.scrollTo({ top: 0 });
        document.documentElement.scrollTo({ top: 0 });
    }

    disconnectedCallback(): void {
        this.removeEventListener(EventType.FAVORITE_CLICKED, this._addOrRemoveFavoriteHandler, false);
        this.removeEventListener(EventType.SUBMIT_REVIEW, this._submitReviewHandler, false);
        super.disconnectedCallback();
    }

    firstUpdated(): void {
        document.querySelector('app-bar')?.dataShouldUpdate(window.location.hash);
        this._getFavoriteData(this.detailsId);
        this._getRestaurantDetailsData(this.detailsId);
    }

    render(): TemplateResult {
        return html`
            ${
                this._restoData === null ? html`
                    <detailscard-shimmer></detailscard-shimmer>
                ` : html`
                    <div class='pagedetails__container'>
                        <div class='pagedetails__detailscard'>
                            <details-card .data=${this._restoData?.restaurant}></details-card>
                        </div>
                        <div class='pagedetails__reviewcard'>
                            <div class='pagedetails__favorite__container'>
                                <h1>Save as favorite</h1>
                                <favorite-button ?isfavorite=${this._isFavorite}></favorite-button>
                            </div>
                            <review-container .data=${this._restoData?.restaurant.consumerReviews}></review-container>
                            <review-form></review-form>
                        </div>                
                    </div>
                `
            }
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-details': PageDetails;
    }
}
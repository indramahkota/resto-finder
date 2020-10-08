import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty, property } from 'lit-element';

import { RestaurantDetailsResponse } from '../data/entity/RestaurantResponse';
import { CustomerReview } from '../data/entity/CustomerReviewEntity';
import { ConsumerReview } from '../data/entity/RestaurantEntity';
import Utils from '../globals/appUtilities';
import EventType from '../globals/eventType';
import ServiceElement from '../_library_/components/_base_/serviceElement';

import '../_library_/components/details-card/detailsCard';
import '../_library_/containers/review-container/reviewContainer';
import '../_library_/components/review-form/reviewForm';
import '../_library_/components/favorite-button/favoriteButton';
import '../_library_/components/detailscard-shimmer/detailsCardShimmer';

// import './page-details.scss';

@customElement('rstf-details')
export default class PageDetails extends ServiceElement {
    @property({ type: String })
    detailsId: string | null = null;

    @internalProperty()
    _restodetailsData: RestaurantDetailsResponse | null = null;

    @internalProperty()
    _reviewListData: ConsumerReview[] = [];

    @internalProperty()
    _isFavorite = false;

    _addFavoriteHandler = async () => {
        if(!this.detailsId || !this._restodetailsData) return;

        try {
            const newFavoriteData = Object.assign(this._restodetailsData.restaurant, { isFavorite: true });
            await this._repository.putFavorite(newFavoriteData);
            this._isFavorite = true;
            Utils.incrementFavoriteCounter();
            this._dispatchData({ message: `Add ${this._restodetailsData?.restaurant.name} to favorite` }, EventType.SHOW_TOAST);
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    _deleteFavoriteHandler = async () => {
        if(!this.detailsId) return;

        try {
            await this._repository.deleteFavorite(this.detailsId);
            this._isFavorite = false;
            Utils.decrementFavoriteCounter();
            this._dispatchData({ message: `Remove ${this._restodetailsData?.restaurant.name} from favorite` }, EventType.SHOW_TOAST);
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    _submitReviewHandler = async (event: Event) => {
        if (!this.detailsId) return;

        const details = (event as CustomEvent).detail;
        const customerReview: CustomerReview = {
            id: this.detailsId,
            name: details.name,
            review: details.review,
            date: Date.now().toString() //Maybe tidak diperhitungkan datanya saat post
        }

        try {
            const reviewResponse = await this._repository.postRestaurantReview(customerReview);
            await this.setConsumerReviewListData(reviewResponse.customerReviews);
            this._dispatchData({ message: 'Submit review success' }, EventType.SHOW_TOAST);
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(EventType.ADD_FAVORITE, this._addFavoriteHandler, false);
        this.addEventListener(EventType.DELETE_FAVORITE, this._deleteFavoriteHandler, false);
        this.addEventListener(EventType.SUBMIT_REVIEW, this._submitReviewHandler, false);

        document.body.scrollTo({ top: 0 });
        document.documentElement.scrollTo({ top: 0 });
    }

    disconnectedCallback(): void {
        this.removeEventListener(EventType.ADD_FAVORITE, this._addFavoriteHandler, false);
        this.removeEventListener(EventType.DELETE_FAVORITE, this._deleteFavoriteHandler, false);
        this.removeEventListener(EventType.SUBMIT_REVIEW, this._submitReviewHandler, false);
        super.disconnectedCallback();
    }

    async setRestaurantDetailsData(restodetailsData: RestaurantDetailsResponse): Promise<void> {
        this._restodetailsData = restodetailsData;
        await this.setConsumerReviewListData(restodetailsData.restaurant.consumerReviews);
    }

    async setConsumerReviewListData(reviewData: ConsumerReview[]): Promise<void> {
        this._reviewListData = reviewData;
    }

    async firstUpdated(): Promise<void> {
        if (!this.detailsId) return;
        document.querySelector('app-bar')?.dataShouldUpdate(window.location.hash);
        
        try {
            const favoriteData = await this._repository.getFavoriteById(this.detailsId);
            if (favoriteData !== undefined)
                this._isFavorite = true;
            const restodetailsData = await this._repository.getRestaurantDetails(this.detailsId);
            await this.setRestaurantDetailsData(restodetailsData);
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    renderShimmer(): TemplateResult {
        return html`
            <detailscard-shimmer></detailscard-shimmer>
        `;
    }

    renderPageDetailsContent(data: RestaurantDetailsResponse): TemplateResult {
        return html`
            <div class='pagedetails__container'>
                <div class='pagedetails'>
                    <div class='pagedetails__detailscard'>
                        <details-card .data=${data.restaurant}></details-card>
                    </div>
                    <div class='pagedetails__reviewcard'>
                        <div class='pagedetails__favorite__container'>
                            <h1 tabindex='0'>Save as favorite</h1>
                            <favorite-button ?isfavorite=${this._isFavorite}></favorite-button>
                        </div>
                        <review-container .data=${this._reviewListData}></review-container>
                        <review-form></review-form>
                    </div>
                </div>
            </div>
        `;
    }

    render(): TemplateResult {
        return html`
            ${
                !this._restodetailsData ? this.renderShimmer() : this.renderPageDetailsContent(this._restodetailsData)
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
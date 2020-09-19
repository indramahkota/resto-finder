import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty, property } from 'lit-element';

import EventType from '../globals/eventType';
import RemoteDataSource from '../data/sources/remote/remoteDataSource';
import { RestaurantDetailsResponse } from '../data/entity/RestaurantResponse';
import CommonElement from '../_library_/components/_base_/commonElement';
import LocalDatabase from '../data/sources/local/database/localDatabase';

import "../_library_/components/details-card/detailsCard";
import "../_library_/containers/review-container/reviewContainer";
import "../_library_/components/review-form/reviewForm";
import "../_library_/components/favorite-button/favoriteButton";

import "./page-details.scss";

@customElement('rstf-details')
export default class PageDetails extends CommonElement {
    @property({ type: String, attribute: true })
    detailsId: string | null = null;

    @internalProperty()
    private _restoData: RestaurantDetailsResponse | null = null;

    @internalProperty()
    private _isFavorite = false;

    private _handleFavorites = async (event: Event) => {
        if(this._restoData?.restaurant === undefined)
            return;
        
        if(this.detailsId === null)
            return;

        const details = (event as CustomEvent).detail;
        
        if(!details.data) {
            this._isFavorite = false;
            LocalDatabase.deleteFavorite(this.detailsId);
        } else {
            this._isFavorite = true;
            LocalDatabase.createFavorite(this._restoData.restaurant);
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(EventType.FAVORITE, this._handleFavorites, false);

        document.querySelector('app-bar')?.dataShouldUpdate(window.location.hash);

        if(this.detailsId === null)
            return;
            
        RemoteDataSource.getRestaurantDetails<RestaurantDetailsResponse>(this.detailsId)
            .then(res => this._restoData = res)
            .catch(err => {
                const showToast = new CustomEvent(EventType.SHOW_TOAST, {
                    detail: {
                        message: err
                    },
                    bubbles: true
                });
                this.dispatchEvent(showToast);
            });
    }

    disconnectedCallback(): void {
        this.removeEventListener(EventType.FAVORITE, this._handleFavorites, false);
        super.disconnectedCallback();
    }

    firstUpdated(): void {
        if(this.detailsId)
            LocalDatabase.getFavoriteById(this.detailsId)
                .then(data => {
                    if(data !== undefined)
                        this._isFavorite = true;
                })
    }

    // <resto-card .data=${this._restoData?.restaurant}></resto-card>
    render(): TemplateResult {
        return html`
            <div class="pagedetails__container">
                <div class="pagedetails__detailscard">
                    <details-card .data=${this._restoData?.restaurant}></details-card>
                </div>
                <div class="pagedetails__reviewcard">
                    <div class="pagedetails__favorite__container">
                        <h1>Save as favorite</h1>
                        <favorite-button ?isfavorite=${this._isFavorite}></favorite-button>
                    </div>
                    <review-container .data=${this._restoData?.restaurant.consumerReviews}></review-container>
                    <review-form></review-form>
                </div>

                
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-details': PageDetails;
    }
}
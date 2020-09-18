import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty, property } from 'lit-element';

import EventType from '../globals/eventType';
import RemoteDataSource from '../data/sources/remote/remoteDataSource';
import { RestaurantDetailsResponse } from '../data/entity/RestaurantResponse';
import CommonElement from '../_library_/components/_base_/commonElement';

import "../_library_/components/details-card/detailsCard";
import "../_library_/containers/review-container/reviewContainer";
import "../_library_/components/review-form/reviewForm";

import "./page-details.scss";

@customElement('rstf-details')
export default class PageDetails extends CommonElement {
    @property({ type: String, attribute: true })
    detailsId: string | null = null;

    @internalProperty()
    private _restoData: RestaurantDetailsResponse | null = null;

    firstUpdated(): void {
        if(this.detailsId === null)
            return;

        document.querySelector('app-bar')?.dataShouldUpdate(window.location.hash);
            
        RemoteDataSource.getRestaurantDetails<RestaurantDetailsResponse>(this.detailsId)
            .then(res => this._restoData = res)
            .catch(err => {
                const showToast = new CustomEvent(EventType.SHOW_TOAST, {
                    detail: {
                        message: `Failed fetch data: ${err}`
                    },
                    bubbles: true
                });
                this.dispatchEvent(showToast);
            });
    }

    // <resto-card .data=${this._restoData?.restaurant}></resto-card>
    render(): TemplateResult {
        return html`
            <div class="pagedetails__container">
                <div class="pagedetails__detailscard">
                    <details-card .data=${this._restoData?.restaurant}></details-card>
                </div>
                <div class="pagedetails__reviewcard">
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
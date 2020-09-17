import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty, property } from 'lit-element';

import EventType from '../globals/eventType';
import RemoteDataSource from '../data/sources/remote/remoteDataSource';
import { RestaurantDetailsResponse } from '../data/entity/RestaurantResponse';
import CommonElement from '../_library_/components/_base_/commonElement';

import "../_library_/components/details-card/detailsCard";
import "../_library_/components/menu-card/menuCard";
import "../_library_/containers/review-container/reviewContainer";
import "../_library_/components/review-form/reviewForm";

@customElement('rstf-details')
export default class PageDetails extends CommonElement {
    @property({ type: String, attribute: true })
    detailsId: string | null = null;

    @internalProperty()
    private _restoData: RestaurantDetailsResponse | null = null;

    firstUpdated(): void {
        if(this.detailsId === null)
            return;
            
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

    updated(): void {
        console.log(this._restoData);
    }

    render(): TemplateResult {
        return html`
            <details-card></details-card>
            <menu-card></menu-card>
            <review-container></review-container>
            <review-form></review-form>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-details': PageDetails;
    }
}
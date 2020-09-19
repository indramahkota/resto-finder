import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';

import CommonElement from '../_library_/components/_base_/commonElement';
import EventType from '../globals/eventType';
import LocalDatabase from '../data/sources/local/database/localDatabase';

import "../_library_/components/hero-element/heroElement";
import "../_library_/containers/resto-container/restoContainer";
import { RestaurantResponse } from '../data/entity/RestaurantResponse';

@customElement('rstf-favorites')
export default class PageFavorites extends CommonElement {
    @internalProperty()
    private _restoData: RestaurantResponse | null = null;

    connectedCallback(): void {
        super.connectedCallback();

        LocalDatabase.getAllFavorite()
            .then(res => {
                const restoResponse: RestaurantResponse = {
                    error: false,
                    message: '',
                    count: 0,
                    restaurants: res
                }
                this._restoData = restoResponse;
            })
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

    render(): TemplateResult {
        return html`
            <section id="favorites-resto">
                <resto-container title="FAVORITES RESTAURANTS" .data=${this._restoData}></resto-container>
            </section>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-favorites': PageFavorites;
    }
}
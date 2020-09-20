import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';

import EventType from '../globals/eventType';
import { RestaurantResponse } from '../data/entity/RestaurantResponse';
import CommonElement from '../_library_/components/_base_/commonElement';

import "../_library_/components/hero-element/heroElement";
// import "../_library_/components/search-bar/searchBar";
import "../_library_/containers/resto-container/restoContainer";
import "../_library_/components/go-top/goTop";
import Repository from '../data/repository';

@customElement('rstf-home')
export default class PageHome extends CommonElement {
    @internalProperty()
    private _restoData: RestaurantResponse | null = null;

    private _goToRestaurants = () => {
        document.querySelector('app-bar')?.hideHeader();
        document.getElementById('top-resto')?.scrollIntoView({ behavior: "smooth" });
    }

    private async _getRestaurantData() {
        try {
            const restoData = await Repository.getAllRestaurant();
            this._restoData = restoData;
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(EventType.LETS_FIND, this._goToRestaurants, false);
    }

    disconnectedCallback(): void {
        this.removeEventListener(EventType.LETS_FIND, this._goToRestaurants, false);
        super.disconnectedCallback();
    }

    firstUpdated(): void {
        this._getRestaurantData();
    }

    render(): TemplateResult {
        return html`
            <section id="greeting">
                <hero-element></hero-element>
            </section>
            <section id="top-resto">
                <resto-container title="TOP RESTAURANTS" .data=${this._restoData}></resto-container>
            </section>
            <go-top></go-top>
            
            <!-- Fitur belum difungsikan -->
            <!-- <search-bar></search-bar> -->
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-home': PageHome;
    }
}
import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';

import RemoteDataSource from '../data/sources/remote/remoteDataSource';
import EventType from '../globals/eventType';
import { RestaurantResponse } from '../data/entity/RestaurantResponse';
import CommonElement from '../_library_/components/_base_/commonElement';

import "../_library_/components/hero-element/heroElement";
// import "../_library_/components/search-bar/searchBar";
import "../_library_/containers/resto-container/restoContainer";
import "../_library_/components/go-top/goTop";

@customElement('rstf-home')
export default class PageHome extends CommonElement {
    @internalProperty()
    private _restoData: RestaurantResponse | null = null;

    private _goToRestaurants = () => {
        document.querySelector('app-bar')?.hideHeader();
        document.getElementById('top-resto')?.scrollIntoView({ behavior: "smooth" });
    }
    
    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(EventType.LETS_FIND, this._goToRestaurants, false);

        RemoteDataSource.getAllRestaurant<RestaurantResponse>()
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
        this.removeEventListener(EventType.LETS_FIND, this._goToRestaurants, false);
        super.disconnectedCallback();
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
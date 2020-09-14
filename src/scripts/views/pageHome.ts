import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';

import "../components/hero-element/heroElement";
import "../components/search-bar/searchBar";
import "../components/resto-container/restoContainer";
import CommonElement from '../components/_base_/commonElement';
import RemoteDataSource from '../data/sources/remote/remoteDataSource';
import { IRestaurants } from '../interfaces/interfaces';
import EventType from '../globals/eventType';

@customElement('rstf-home')
export default class PageHome extends CommonElement {
    @internalProperty()
    private _restoData: IRestaurants | null = null;
    
    connectedCallback(): void {
        super.connectedCallback();

        RemoteDataSource.getAllRestaurant<IRestaurants>()
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

    render(): TemplateResult {
        return html`
            <section id="greeting">
                <hero-element></hero-element>
            </section>
            <section id="top-resto">
                <resto-container title="TOP RESTAURANTS" .data=${this._restoData}></resto-container>
            </section>
            <search-bar></search-bar>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-home': PageHome;
    }
}
import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';

import { RestaurantResponse } from '../data/entity/RestaurantResponse';
import EventType from '../globals/eventType';
import ServiceElement from '../_library_/components/_base_/serviceElement';

import '../_library_/components/hero-element/heroElement';
import '../_library_/containers/resto-container/restoContainer';
import '../_library_/components/go-top/goTop';

@customElement('rstf-home')
export default class PageHome extends ServiceElement {
    @internalProperty()
    _restoListData: RestaurantResponse | null = null;

    _focusOnTopRestaurantsHandler = (): void => {
        document.querySelector('app-bar')?.hideHeader();
        document.querySelector('resto-container')?.scrollIntoView({ behavior: 'smooth' });
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(EventType.LETS_FIND, this._focusOnTopRestaurantsHandler, false);
    }

    disconnectedCallback(): void {
        this.removeEventListener(EventType.LETS_FIND, this._focusOnTopRestaurantsHandler, false);
        super.disconnectedCallback();
    }

    async setRestaurantListData(restoListData: RestaurantResponse): Promise<void> {
        this._restoListData = restoListData;
    }

    async firstUpdated(): Promise<void> {
        try {
            const restoListData = await this._repository.getAllRestaurants();
            await this.setRestaurantListData(restoListData);
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    render(): TemplateResult {
        return html`
            <hero-element></hero-element>
            <resto-container title='TOP RESTAURANTS' .data=${this._restoListData} totalShimmerItem=20></resto-container>
            <go-top></go-top>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-home': PageHome;
    }
}
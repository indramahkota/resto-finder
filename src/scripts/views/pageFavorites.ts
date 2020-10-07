import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';

import { RestaurantResponse } from '../data/entity/RestaurantResponse';
import ServiceElement from '../_library_/components/_base_/serviceElement';
import Utils from '../globals/appUtilities';
import AppConfig from '../globals/appConfig';
import EventType from '../globals/eventType';

import '../_library_/components/hero-element/heroElement';
import '../_library_/containers/resto-container/restoContainer';

@customElement('rstf-favorites')
export default class PageFavorites extends ServiceElement {
    @internalProperty()
    _restoListData: RestaurantResponse | null = null;

    _getFavoriteCounter(): number {
        const counter = Utils.getLCS(AppConfig.LCS_FAVORITE_COUNTER);
        return (!counter || counter === '0') ? 0 : Number(counter);
    }

    _deleteFavoritedHandler = async (event: Event) => {
        const details = (event as CustomEvent).detail;
        if(!details.id || details.id === '') return;

        try {
            await this._repository.deleteFavorite(details.id);
            await this._loadFavoriteData();
            Utils.decrementFavoriteCounter();
            this._dispatchData({ message: `Remove ${details.name} from favorite` }, EventType.SHOW_TOAST);
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    async _loadFavoriteData() {
        try {
            const restoData = await this._repository.getAllFavorites();
            await this.setRestaurantListData({
                error: false,
                message: 'success',
                count: restoData.length,
                restaurants: restoData
            });
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(EventType.DELETE_FAVORITE, this._deleteFavoritedHandler, false);
    }

    disconnectedCallback(): void {
        this.removeEventListener(EventType.DELETE_FAVORITE, this._deleteFavoritedHandler, false);
        super.disconnectedCallback();
    }

    async setRestaurantListData(restoListData: RestaurantResponse): Promise<void> {
        this._restoListData = restoListData;
    }

    async firstUpdated(): Promise<void> {
        await this._loadFavoriteData();
    }

    render(): TemplateResult {
        return html`
            <section id='favorites-resto'>
                <resto-container title='FAVORITES' .data=${this._restoListData} totalShimmerItem=${this._getFavoriteCounter()}></resto-container>
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
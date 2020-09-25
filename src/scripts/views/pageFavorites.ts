import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';

import EventType from '../globals/eventType';
import ServiceElement from '../_library_/components/_base_/serviceElement';
import { RestaurantResponse } from '../data/entity/RestaurantResponse';

import '../_library_/components/hero-element/heroElement';
import '../_library_/containers/resto-container/restoContainer';

@customElement('rstf-favorites')
export default class PageFavorites extends ServiceElement {
    @internalProperty()
    private _restoData: RestaurantResponse | null = null;

    private _deleteFavoritedHandler = async (event: Event) => {
        const details = (event as CustomEvent).detail;
        try {
            await this._repository.deleteFavorite(details.id);
            await this._loadFavoriteData();
            this._dispatchData({ message: `Remove ${details.name} from favorite` }, EventType.SHOW_TOAST);
        } catch (error) {
            this._dispatchData({ message: error }, EventType.SHOW_TOAST);
        }
    }

    private async _loadFavoriteData() {
        try {
            const restoData = await this._repository.getAllFavorite();
            this._restoData = {
                error: false,
                message: 'success',
                count: restoData.length,
                restaurants: restoData
            };
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

    firstUpdated(): void {
        this._loadFavoriteData();
    }

    render(): TemplateResult {
        return html`
            <section id='favorites-resto'>
                <resto-container title='FAVORITES' .data=${this._restoData}></resto-container>
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
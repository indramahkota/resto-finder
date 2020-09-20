import { html, nothing, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';

import Repository from '../data/repository';
import CommonElement from '../_library_/components/_base_/commonElement';
import EventType from '../globals/eventType';
import { RestaurantResponse } from '../data/entity/RestaurantResponse';

import "../_library_/components/hero-element/heroElement";
import "../_library_/containers/resto-container/restoContainer";

@customElement('rstf-favorites')
export default class PageFavorites extends CommonElement {
    @internalProperty()
    private _restoData: RestaurantResponse | null = null;

    private _onFavoriteDeletedHandler = async (event: Event) => {
        const details = (event as CustomEvent).detail;
        await Repository.deleteFavorite(details.data);
        this.dispatchEvent(new CustomEvent(EventType.SHOW_TOAST, {
            detail: {
                message: "Remove favorites complete"
            },
            bubbles: true
        }));
        this._loadFavoriteData();
    }

    private _loadFavoriteData() {
        Repository.getAllFavorite()
            .then(res => {
                this._restoData = {
                    error: false,
                    message: 'success',
                    count: res.length,
                    restaurants: res
                };
            })
            .catch(err => {
                this.dispatchEvent(new CustomEvent(EventType.SHOW_TOAST, {
                    detail: {
                        message: err
                    },
                    bubbles: true
                }));
            });
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(EventType.FAVORITE_DELETED, this._onFavoriteDeletedHandler, false);
        this._loadFavoriteData();
    }

    disconnectedCallback(): void {
        this.removeEventListener(EventType.FAVORITE_DELETED, this._onFavoriteDeletedHandler, false);
        super.disconnectedCallback();
    }

    render(): TemplateResult {
        return html`
            <section id="favorites-resto">
                ${
                    this._restoData !== null ? html`<resto-container title="FAVORITES" .data=${this._restoData}></resto-container>` : nothing
                }
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
import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import EventType from '../../../globals/eventType';
import CommonElement from '../_base_/commonElement';

import './favorite-button.scss';

@customElement('favorite-button')
export default class FavoriteButton extends CommonElement {
    @property({ type: Boolean, attribute: true })
    isFavorite = false;

    render(): TemplateResult {
        return html`
            <button aria-label="Favorite Button" class="favorite__button" @click="${this._onButtonClickHandler}">
                ${
                    this.isFavorite ? html`<i style="color: pink;" class="fas fa-heart"></i>` : html`<i class="far fa-heart"></i>`
                }
            </button>
        `;
    }

    private _onButtonClickHandler(): void {
        this.isFavorite = !this.isFavorite;
        const myFavorite = new CustomEvent(EventType.FAVORITE, {
            detail: {
                message: 'Favorite Clicked',
                data: this.isFavorite
            },
            bubbles: true
        });
        this.dispatchEvent(myFavorite);
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'favorite-button': FavoriteButton;
    }
}
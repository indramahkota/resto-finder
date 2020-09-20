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
            <button aria-label='Favorite Button is favorite ${this.isFavorite}' class='favorite__button' @click='${this._onButtonClickHandler}'>
                ${
                    this.isFavorite ? html`<i style='color: #ff69b4;' class='fas fa-heart'></i>` : html`<i class='far fa-heart'></i>`
                }
            </button>
        `;
    }

    private _onButtonClickHandler(): void {
        this.isFavorite = !this.isFavorite;
        this.dispatchEvent(new CustomEvent(EventType.FAVORITE_CLICKED, {
            detail: {
                message: 'Favorite Clicked',
                data: this.isFavorite
            },
            bubbles: true
        }));
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'favorite-button': FavoriteButton;
    }
}
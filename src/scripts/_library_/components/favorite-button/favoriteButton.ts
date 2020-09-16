import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';
import CommonElement from '../_base_/commonElement';
import EventType from '../../../globals/eventType';

@customElement('favorite-button')
export default class FavoriteButton extends CommonElement {
    @property({ type: Boolean, attribute: true })
    isFavorite = false;

    private _favoriteButton: HTMLElement | null = null;

    render(): TemplateResult {
        return html`
            <button aria-label="Favorite Button" class="favorite__button" @click="${this._onButtonClickHandler}">
                ${
                    this.isFavorite ? html`<i class="fas fa-heart"></i>` : html`<i class="far fa-heart"></i>`
                }
            </button>
        `;
    }

    private _onButtonClickHandler(): void {
        this._favoriteButton?.blur();
        const myFavorite = new CustomEvent(EventType.FAVORITE, {
            detail: {
                message: `Favorite Clicked`
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
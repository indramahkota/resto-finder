import { html, nothing, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import { Restaurant } from '../../../data/entity/RestaurantEntity';
import LazyLoadElement from '../_base_/lazyLoadElement';
import EventType from '../../../globals/eventType';
import Utils from '../../../globals/appUtilities';
import placeholderImage from '../../../../assets/images/placeholder.png';

import '../rating-element/ratingElement';

// import './resto-card.scss';

@customElement('resto-card')
export default class RestoCard extends LazyLoadElement {
    @property({ type: Object })
    data: Restaurant | null = null;

    _onButtonClickHandler() {
        this._dispatchData({ id: this.data?.id, name: this.data?.name }, EventType.DELETE_FAVORITE);
    }

    firstUpdated(): void {
        const pictId = this.data?.pictureId;
        if(pictId === undefined)
            return;
        const image = <HTMLImageElement>document.getElementById(pictId);
        this._setupImageLazy(image);
    }

    renderDeleteButton(): TemplateResult {
        return html`
            <div class='card__delete'>
                <button @click='${this._onButtonClickHandler}'><i class='fas fa-trash-alt'></i></button>
            </div>
        `;
    }

    renderCardImage(): TemplateResult {
        const pictName = this.data?.name;
        const pictId = this.data?.pictureId;
        if (pictName === undefined || pictId === undefined)
            return html`<img src='${placeholderImage}' alt='Placeholder'>`;
        return html`
            <img id='${pictId}' class='lazy' src='${placeholderImage}' data-src=${Utils.genImgSrc(pictId, 'small')} alt='${pictId}'>
        `;
    }

    render(): TemplateResult {
        return html`
            <div class='card__container'>
                <a href='#/details/${this.data?.id}'>
                    <span class='card__rating'>⭐ ${this.data?.rating}</span>
                    ${
                        this.renderCardImage()
                    }
                    <div class='card__content'>
                        <p tabindex='0' class='card__city'>${this.data?.city.toUpperCase()}</p>
                        <p tabindex='0' class='card__name'><b>${this.data?.name}</b></p>
                        <p tabindex='0' class='card__description'>${this.data?.description}</p>
                    </div>
                </a>

                ${
                    this.data?.isFavorite ? this.renderDeleteButton() : nothing
                }
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'resto-card': RestoCard;
    }
}
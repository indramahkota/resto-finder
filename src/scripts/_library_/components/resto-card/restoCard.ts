import { html, nothing, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import AppConfig from '../../../globals/appConfig';
import { Restaurant } from '../../../data/entity/RestaurantEntity';
import CommonElement from '../_base_/commonElement';

import "../rating-element/ratingElement";

import './resto-card.scss';
import EventType from '../../../globals/eventType';

@customElement('resto-card')
export default class RestoCard extends CommonElement {
    @property({ type: Object, attribute: true })
    data: Restaurant | undefined;

    private _imgLoaded = false;

    private _lazyLoad = () => {
        if(this.data === undefined || this._imgLoaded)
            return;
        
        const image = <HTMLImageElement>document.getElementById(this.data.pictureId);

        /* #WARNING# Sebaiknya jangan pakai setTimeout() */
        setTimeout(() => {
            const scrollTop = window.pageYOffset;
            if(image.offsetTop < (window.innerHeight + scrollTop)) {
                const imageUrl = this.checkImgSrcValue(this.data?.pictureId);
                if(imageUrl === undefined)
                    return;

                const imageHelper = new Image();
                imageHelper.src = imageUrl;
                imageHelper.onload = () => {
                    image.classList.add('complete');
                    image.src = imageHelper.src;
                    this._imgLoaded = true;

                    document.removeEventListener("scroll", this._lazyLoad, false);
                    window.removeEventListener("resize", this._lazyLoad, false);
                    window.removeEventListener("orientationChange", this._lazyLoad, false);
                }
            }
        }, 150);
    }

    private _onButtonClickHandler() {
        this.dispatchEvent(new CustomEvent(EventType.FAVORITE_DELETED, {
            detail: {
                message: "Please delete this favorite",
                data: this.data?.id
            },
            bubbles: true
        }));
    }

    connectedCallback(): void {
        super.connectedCallback();
        document.addEventListener("scroll", this._lazyLoad, false);
        window.addEventListener("resize", this._lazyLoad, false);
        window.addEventListener("orientationChange", this._lazyLoad, false);
    }

    disconnectedCallback(): void {
        document.removeEventListener("scroll", this._lazyLoad, false);
        window.removeEventListener("resize", this._lazyLoad, false);
        window.removeEventListener("orientationChange", this._lazyLoad, false);
        super.disconnectedCallback();
    }

    firstUpdated(): void {
        this._lazyLoad();
    }

    render(): TemplateResult {
        return html`
            <div class="card__container">
                <div class="image__content">
                    <img id="${ifDefined(this.data?.pictureId)}" src="${AppConfig.URL_LOADING_SVG}" alt="${ifDefined(this.data?.name)} Image Name">
                    ${
                        this.data?.isFavorite ? html`
                        <div class="card__delete">
                            <button @click="${this._onButtonClickHandler}"><i class="fas fa-trash-alt"></i></button>
                        </div>` : nothing
                    }
                </div>
                <div class="card__content">
                    <p tabindex="0" class="card__city">${this.data?.city.toUpperCase()}</p>
                    <a href="#/details/${this.data?.id}" class="card__name"><b>${this.data?.name}</b></a>
                    <rating-element tabindex="0" aria-label="Rating ${this.data?.rating}" rating=${ifDefined(this.data?.rating)}></rating-element>
                    <p tabindex="0" class="card__description">${this.data?.description}</p> 
                </div>
            </div>
        `;
    }

    checkImgSrcValue(val?: string): string | undefined {
        return val === undefined ? undefined : `${AppConfig.BASE_IMAGE_URL}small/${val}`;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'resto-card': RestoCard;
    }
}
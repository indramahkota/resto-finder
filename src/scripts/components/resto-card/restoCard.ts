import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import "../hero-element/heroElement";
import "../rating-element/ratingElement";

import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';
import { Restaurant } from '../../data/entity/RestaurantEntity';

@customElement('resto-card')
export default class RestoCard extends CommonElement {
    @property({ type: Object, attribute: true })
    data: Restaurant | undefined;

    private _imgLoaded = false;
    private _timeOutId: number | null = null;

    private _lazyLoad = () => {
        if(this.data === undefined || this._imgLoaded)
            return;
        
        const image = <HTMLImageElement>document.getElementById(this.data.pictureId);

        if(this._timeOutId !== null)
            clearTimeout(this._timeOutId);

        /* #WARNING# Sebaiknya jangan pakai setTimeout() */
        this._timeOutId = window.setTimeout(() => {
            const scrollTop = window.pageYOffset;
            if(image.offsetTop < (window.innerHeight + scrollTop)) {
                const imageHelper: HTMLImageElement | null = new Image();
                imageHelper.src = this.checkImgSrcValue(this.data?.pictureId);
                imageHelper.onload = () => {
                    if(image === null)
                        return;

                    this._imgLoaded = true;
                    image.classList.add('complete');
                    image.src = imageHelper.src;

                    document.removeEventListener("scroll", this._lazyLoad, false);
                    window.removeEventListener("resize", this._lazyLoad, false);
                    window.removeEventListener("orientationChange", this._lazyLoad, false);
                }
            }
        }, 50);
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
                </div>
                <div class="card__content">
                    <p tabindex="0" class="card__city">${this.data?.city.toUpperCase()}</p>
                    <a href="#/details/${this.data?.id}" class="card__name"><b>${this.data?.name}</b></a>
                    <rating-element rating=${ifDefined(this.data?.rating)}></rating-element>
                    <p tabindex="0" class="card__description">${this.data?.description}</p> 
                </div>
            </div>
        `;
    }

    checkImgSrcValue(val?: string): string {
        return AppConfig.BASE_IMAGE_URL + val;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'resto-card': RestoCard;
    }
}
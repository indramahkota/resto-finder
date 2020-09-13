import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import "../hero-element/heroElement";
import "../rating-element/ratingElement";

import CommonElement from '../_base_/commonElement';
import { IRestaurant } from "../../interfaces/interfaces";
import AppConfig from '../../globals/appConfig';

@customElement('resto-card')
export default class RestoCard extends CommonElement {
    @property({ type: Object, attribute: true })
    data: IRestaurant | undefined;

    private _imgLoaded = false;

    private _lazyLoad = () => {
        if(this.data === undefined || this._imgLoaded)
            return;
        
        const image = <HTMLImageElement>document.getElementById(this.data.pictureId);

        const scrollTop = window.pageYOffset;
        if(image.offsetTop < (window.innerHeight + scrollTop)) {
            image.src = this.checkImgSrcValue(this.data.pictureId);
            image.onload = () => {
                this._imgLoaded = true;
                image.classList.add('complete');
                document.removeEventListener("scroll", this._lazyLoad, false);
                window.removeEventListener("resize", this._lazyLoad, false);
                window.removeEventListener("orientationChange", this._lazyLoad, false);
            }
        }
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
                    <a href="#" class="card__name"><b>${this.data?.name}</b></a>
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
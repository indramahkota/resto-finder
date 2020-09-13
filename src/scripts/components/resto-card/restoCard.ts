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

    firstUpdated(): void {
        if(this.data === undefined)
            return;
            
        const image = <HTMLImageElement>document.getElementById(this.data.pictureId);

        const imageHelper = new Image();
        imageHelper.src = this.checkImgSrcValue(this.data.pictureId);
        imageHelper.onload = () => {
            if(image === null)
                return;
            
            /* #WARNING# Sebaiknya jangan:::Supaya nampak loadingnya aja wkwk */
            setTimeout(() => {
                image.src = imageHelper.src;
                image.classList.add('complete');
            }, 1000);
        }
    }

    render(): TemplateResult {
        return html`
            <div class="card__container">
                <div class="image__content">
                    <img id="${ifDefined(this.data?.pictureId)}" src="${AppConfig.URL_LOADING_SVG}" alt="${ifDefined(this.data?.name)} Image Name">
                </div>
                <div class="card__content">
                    <a href="#" class="card__name"><b>${this.data?.name}</b></a>
                    <p tabindex="0" class="card__city">${this.data?.city}</p>
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
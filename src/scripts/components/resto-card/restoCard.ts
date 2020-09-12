/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-05 23:57:18
 * @modify date 2020-09-05 23:57:18
 * @desc [description]
 */

/*
// Penggunaan
import {html, render} from 'lit-html';

render(html`
    <resto-card .data=${{object data}}></resto-card>
`, document.body); */

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

    render(): TemplateResult {
        return html`
            <div class="card__container">
                <img src="${ifDefined(this.checkImgSrcValue(this.data?.pictureId))}" alt="${ifDefined(this.data?.name)}">
                <div class="card__content">
                    <a href="#" class="card__name"><b>${this.data?.name}</b></a>
                    <p tabindex="0" class="card__city">${this.data?.city}</p>
                    <rating-element rating=${ifDefined(this.data?.rating)}></rating-element>
                    <p tabindex="0" class="card__description">${this.data?.description}</p> 
                </div>
            </div>
        `;
    }

    checkImgSrcValue(val?: string): string | undefined {
        if(val !== undefined) {
            return AppConfig.BASE_IMAGE_URL + val;
        }
        return undefined;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'resto-card': RestoCard;
    }
}
/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-05 23:57:18
 * @modify date 2020-09-05 23:57:18
 * @desc [description]
 */

import { html } from 'lit-html';
import { customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import "../hero-element/heroElement";
import "../rating-element/ratingElement";
import CommonElement from '../_base_/commonElement';

import style from './resto-card.scss';
import { IRestaurant } from "../../interfaces/interfaces";

@customElement('resto-card')
export default class RestoCard extends CommonElement {
    @property({ type: Object, attribute: true })
    data: IRestaurant | undefined;

    static get styles() {
        return [...super.styles, style];
    }

    render() {
        return html`
            <div class="card__container">
                <img src="${ifDefined(this.data?.pictureId)}" alt="${ifDefined(this.data?.name)}">
                <div class="card__content">
                    <p class="card__name"><b>${this.data?.name}</b></p>
                    <p class="card__city">${this.data?.city}</p>
                    <rating-element rating=${ifDefined(this.data?.rating)}></rating-element>
                    <p class="card__description">${this.data?.description}</p> 
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'resto-card': RestoCard;
    }
}
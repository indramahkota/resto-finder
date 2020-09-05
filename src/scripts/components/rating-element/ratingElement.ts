/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-05 09:57:09
 * @modify date 2020-09-05 09:57:09
 * @desc [description]
 */

import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import "../hero-element/heroElement";
import "../resto-container/restoContainer";
import CommonElement from '../_base_/commonElement';
import AppIcons from '../../globals/appIcons';
import Utils from '../../globals/appUtilities';

import style from './rating-element.scss';

/*
// Penggunaan
import {html, render} from 'lit-html';

render(html`
    <rating-element rating="0.4"></rating-element>
`, document.body); */
@customElement('rating-element')
export default class RatingElement extends CommonElement {
    @property({ type: Number, attribute: true })
    rating: number = 0;

    private _starIcon = AppIcons.STAR;

    static get styles() {
        return [...super.styles, style];
    }

    /* 
        Bisa menggunakan karakter
        ☆☆☆☆☆
        ★★★★★
    */
    render() {
        return html`
            <div class="rating__container">
                ${Utils.genSVG(this._starIcon)}
                ${Utils.genSVG(this._starIcon)}
                ${Utils.genSVG(this._starIcon)}
                ${Utils.genSVG(this._starIcon)}
                ${Utils.genSVG(this._starIcon)}

                <div class="gold__rating__item" style="width: ${(this.rating/5)*100}%;">
                    ${Utils.genSVG(this._starIcon)}
                    ${Utils.genSVG(this._starIcon)}
                    ${Utils.genSVG(this._starIcon)}
                    ${Utils.genSVG(this._starIcon)}
                    ${Utils.genSVG(this._starIcon)}
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'rating-element': RatingElement;
    }
}
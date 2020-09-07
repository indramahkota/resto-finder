/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-05 09:57:09
 * @modify date 2020-09-06 20:56:01
 * @desc [description]
 */

/*
// Penggunaan
import {html, render} from 'lit-html';

render(html`
    <rating-element rating="0.4"></rating-element>
`, document.body); */

import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import "../hero-element/heroElement";
import "../resto-container/restoContainer";

import CommonElement from '../_base_/commonElement';

import style from './rating-element.scss';

@customElement('rating-element')
export default class RatingElement extends CommonElement {
    @property({ type: Number, attribute: true })
    rating: number = 0;

    // private _starIcon = AppIcons.STAR;

    static get styles() {
        return [...super.styles, style];
    }
    
    render() {
        return html`
            <div class="rating__container">
                ★★★★★
                <div class="gold__rating__item" style="color: gold; width: ${(this.rating/5)*100}%;">
                    ★★★★★
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
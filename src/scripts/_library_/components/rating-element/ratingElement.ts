import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';

import './rating-element.scss';

@customElement('rating-element')
export default class RatingElement extends CommonElement {
    @property({ type: Number, attribute: true })
    rating = 0;
    
    render(): TemplateResult {
        return html`
            <div class='rating__container'>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <div class='gold__rating__item' style='width: ${(this.rating/5)*100}%;'>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                </div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rating-element': RatingElement;
    }
}
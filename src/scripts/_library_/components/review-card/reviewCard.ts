import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import Utils from '../../../globals/appUtilities';
import { ConsumerReview } from '../../../data/entity/RestaurantEntity';

@customElement('review-card')
export default class ReviewCard extends CommonElement {
    @property({ type: Object, attribute: true })
    data: ConsumerReview | null = null;

    render(): TemplateResult {
        return html`
            <div class="reviewcard__container">
                <img class="reviewcard__image" src="${Utils.randAvatar()}" alt="Avatar">
                <p class="reviewcard__message">${this.data?.review}</p>
                <span class="reviewcard__time">${this.data?.date}</span>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'review-card': ReviewCard;
    }
}
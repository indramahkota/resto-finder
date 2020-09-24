import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';
import anonymous from '../../../../assets/images/avatars/anonymous-avatar.svg';

import CommonElement from '../_base_/commonElement';
import { ConsumerReview } from '../../../data/entity/RestaurantEntity';

import './review-card.scss';

@customElement('review-card')
export default class ReviewCard extends CommonElement {
    @property({ type: Object })
    data: ConsumerReview | null = null;

    render(): TemplateResult {
        return html`
            <div class='reviewcard__container'>
                <div class='reviewcard__image__container'>
                    <img class='reviewcard__image' src='${anonymous}' alt='Reviewer Avatar'>
                </div>
                <div class='reviewcard__content'>
                    <p tabindex='0' class='reviecard__name'>${this.data?.name}</p>
                    <p tabindex='0' class='reviewcard__time'>${this.data?.date}</p>
                    <p tabindex='0' class='reviewcard__message'>${this.data?.review}</p>
                </div>
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
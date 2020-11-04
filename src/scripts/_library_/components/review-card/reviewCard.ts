import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';
import anonymous from '../../../../assets/images/avatars/anonymous_avatar.svg';

import CommonElement from '../_base_/commonElement';
import { CustomerReview } from '../../../data/entity/CustomerReviewEntity';

// import './review-card.scss';

@customElement('review-card')
export default class ReviewCard extends CommonElement {
    @property({ type: Object })
    data: CustomerReview | null = null;

    render(): TemplateResult {
        return html`
            <div class='reviewCardContainer'>
                <div class='reviewCardImageContainer'>
                    <img class='reviewCardImage' src='${anonymous}' alt='Reviewer Avatar'>
                </div>
                <div class='reviewCardContent'>
                    <p tabindex='0' class='reviewCardName'>${this.data?.name}</p>
                    <p tabindex='0' class='reviewCardTime'>${this.data?.date}</p>
                    <p tabindex='0' class='reviewCardMessage'>${this.data?.review}</p>
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
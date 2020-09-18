import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../../components/_base_/commonElement';
import { ConsumerReview } from '../../../data/entity/RestaurantEntity';

import '../../components/review-card/reviewCard';

@customElement('review-container')
export default class ReviewContainer extends CommonElement {
    @property({ type: String, attribute: true })
    title = 'REVIEWS';

    @property({ type: Array, attribute: true })
    data?: ConsumerReview[] | null = null;

    //.data=${res}
    render(): TemplateResult {
        return html`
            <div class="review__container">
                <h1 tabindex="0" class="review__title">${this.title}</h1>
                    <div class="review__items">
                        ${
                            this.data?.map(res => html`<review-card .data=${res}></review-card>`)
                        }
                    </div>
                </div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'review-container': ReviewContainer;
    }
}
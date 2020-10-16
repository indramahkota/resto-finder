import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../../components/_base_/commonElement';
import { ConsumerReview } from '../../../data/entity/RestaurantEntity';

import '../../components/review-card/reviewCard';

// import './review-container.scss';

@customElement('review-container')
export default class ReviewContainer extends CommonElement {
    @property({ type: String })
    title = 'LATEST REVIEWS';

    @property({ type: Array })
    data: ConsumerReview[] = [];

    render(): TemplateResult {
        return html`
            <div class='reviewContainer'>
                <h1 tabindex='0' class='reviewTitle'>${this.title}</h1>
                    <div class='reviewItems'>
                        ${this.data.slice(Math.max(this.data.length - 5, 0)).reverse().map(res => html`<review-card .data=${res}></review-card>`)}
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
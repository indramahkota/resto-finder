import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';

@customElement('review-card')
export default class ReviewCard extends CommonElement {
    @property({ type: String, attribute: true })
    message = 'This is Toaster';

    render(): TemplateResult {
        return html`
            
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'review-card': ReviewCard;
    }
}
import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';

import './review-form.scss';

@customElement('review-form')
export default class ReviewForm extends CommonElement {
    @property({ type: String, attribute: true })
    message = 'This is Toaster';

    render(): TemplateResult {
        return html`
            <div class="reviewform__container">
                <input aria-label="Type your Name" class="reviewinput__name" placeholder="Type Your Name" type="text">
                <textarea aria-label="Type your Review" class="reviewtextarea__review" placeholder="This Restaurant is awesome!"></textarea>
                <button class="reviewbutton__submit">Send Review</button>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'review-form': ReviewForm;
    }
}
import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';

import './review-form.scss';

@customElement('review-form')
export default class ReviewForm extends CommonElement {
    @property({ type: String, attribute: true })
    name = 'Reviewer';

    @property({ type: String, attribute: true })
    review = 'Review';

    private _onNameChangeHandler(event: Event): void {
        this.name = (event.target as HTMLInputElement).value;
    }

    private _onReviewChangeHandler(event: Event): void {
        this.review = (event.target as HTMLTextAreaElement).value;
    }

    private _onButtonClickHandler(): void {
        this.name = '';
        this.review = '';
    }

    render(): TemplateResult {
        return html`
            <div class="reviewform__container">
                <input aria-label="Type your Name" class="reviewinput__name" placeholder="Type Your Name" type="text" @change="${this._onNameChangeHandler}">
                <textarea aria-label="Type your Review" class="reviewtextarea__review" placeholder="This Restaurant is awesome!" @change="${this._onReviewChangeHandler}"></textarea>
                <button class="reviewbutton__submit" @click="${this._onButtonClickHandler}">Send Review</button>
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
import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';

import CommonElement from '../_base_/commonElement';

import './review-form.scss';
import EventType from '../../../globals/eventType';

@customElement('review-form')
export default class ReviewForm extends CommonElement {
    @internalProperty()
    private _name = '';

    @internalProperty()
    private _review = '';

    private _onNameChangeHandler(event: Event): void {
        this._name = (event.target as HTMLInputElement).value;
    }

    private _onReviewChangeHandler(event: Event): void {
        this._review = (event.target as HTMLTextAreaElement).value;
    }

    private _onButtonClickHandler(): void {
        if(this._name.trim() === '' || this._review.trim() === '') {
            this._dispatchData({ message: 'There is Empty input, please check again!' }, EventType.SHOW_TOAST);
            return;
        }
        this._dispatchData({ name: this._name, review: this._review }, EventType.SUBMIT_REVIEW);
        this._name = '';
        this._review = '';
    }

    render(): TemplateResult {
        return html`
            <div class='reviewform__container'>
                <input aria-label='Type your Name' class='reviewinput__name' placeholder='Type Your Name' type='text' @change='${this._onNameChangeHandler}' .value='${this._name}'>
                <textarea aria-label='Type your Review' class='reviewtextarea__review' placeholder='This Restaurant is awesome!' @change='${this._onReviewChangeHandler}' .value='${this._review}'></textarea>
                <button class='reviewbutton__submit' @click='${this._onButtonClickHandler}'>Add Review</button>
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
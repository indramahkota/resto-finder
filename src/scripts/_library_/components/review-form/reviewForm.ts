import { html, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import EventType from '../../../globals/eventType';

// import './review-form.scss';

@customElement('review-form')
export default class ReviewForm extends CommonElement {
    @internalProperty()
    _name: string | null = '';

    @internalProperty()
    _review: string | null = '';

    _onNameChangeHandler(event: Event): void {
        this.setName((event.target as HTMLInputElement).value);
    }

    _onReviewChangeHandler(event: Event): void {
        this.setReview((event.target as HTMLTextAreaElement).value);
    }

    _onButtonClickHandler(): void {
        if ((!this._name && !this._review) || (this._name?.trim() === '' && this._review?.trim() === '')) {
            this.setName(null);
            this.setReview(null);
            this._dispatchData({ message: 'Name and Review input can not be empty!' }, EventType.SHOW_TOAST);
            return;
        }
        if (!this._name || !this._review || this._name?.trim() === '' || this._review?.trim() === '') {
            let fieldError;
            if (!this._name || this._name === '') {
                this.setName(null);
                fieldError = 'Name';
            }
            if (!this._review || this._review === '') {
                this.setReview(null);
                fieldError = 'Review'
            }
            this._dispatchData({ message: `${fieldError} input can not be empty!` }, EventType.SHOW_TOAST);
            return;
        }
        this._dispatchData({ name: this._name, review: this._review }, EventType.SUBMIT_REVIEW);
        this.setName('');
        this.setReview('');
    }

    setName(name: string | null): void {
        this._name = name;
    }

    setReview(review: string | null): void {
        this._review = review;
    }

    render(): TemplateResult {
        return html`
            <div class='reviewform__container'>
                <input id='review-input' aria-label='Type your Name' class='reviewinput__name' placeholder='Type Your Name' type='text' @change='${this._onNameChangeHandler}' .value='${this._name === null ? '' : this._name}' ?required=${this._name === null}>
                <textarea id='review-textarea' aria-label='Type your Review' class='reviewtextarea__review' placeholder='This Restaurant is awesome!' @change='${this._onReviewChangeHandler}' .value='${this._review === null ? '' : this._review}' ?required=${this._review === null}></textarea>
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
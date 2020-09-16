import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import EventType from '../globals/eventType';
import CommonElement from '../_library_/components/_base_/commonElement';

import "../_library_/components/details-card/detailsCard";
import "../_library_/components/menu-card/menuCard";
import "../_library_/containers/review-container/reviewContainer";
import "../_library_/components/review-form/reviewForm";

@customElement('rstf-details')
export default class PageDetails extends CommonElement {
    @property({ type: String, attribute: true })
    detailsId = 'id';

    firstUpdated(): void {
        const showToast = new CustomEvent(EventType.SHOW_TOAST, {
            detail: {
                message: `Message: Hello ${this.detailsId}`
            },
            bubbles: true
        });
        this.dispatchEvent(showToast);
    }

    render(): TemplateResult {
        return html`
            <details-card></details-card>
            <menu-card></menu-card>
            <review-container></review-container>
            <review-form></review-form>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-details': PageDetails;
    }
}
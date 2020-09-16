import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import EventType from '../globals/eventType';
import CommonElement from '../_library_/components/_base_/commonElement';

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
            
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-details': PageDetails;
    }
}
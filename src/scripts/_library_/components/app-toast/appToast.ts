import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';

@customElement('app-toast')
export default class AppToast extends CommonElement {
    @property({ type: String, attribute: true })
    message = 'This is Toaster';

    render(): TemplateResult {
        return html`
            <div class="toast__container">
                <div class="app__toast">${this.message}</div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'app-toast': AppToast;
    }
}
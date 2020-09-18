import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import AppConfig from '../../../globals/appConfig';
import CommonElement from '../_base_/commonElement';

import './foot-bar.scss';

@customElement('foot-bar')
export default class FootBar extends CommonElement {
    @property({ type: String, attribute: true })
    text = AppConfig.TEXT_FOOTER;

    render(): TemplateResult {
        return html`
            <footer class="footer">
                <p tabindex="0">${this.text}</p>
            </footer>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'foot-bar': FootBar;
    }
}
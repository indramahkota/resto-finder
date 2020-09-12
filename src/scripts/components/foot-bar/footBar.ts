import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';

@customElement('foot-bar')
class FootBar extends CommonElement {
    @property({ type: String, attribute: true })
    text = AppConfig.TEXT_FOOTER;

    render() {
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
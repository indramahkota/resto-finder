import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';

@customElement('hero-element')
export default class HeroElement extends CommonElement {
    @property({ type: String, attribute: true })
    greeting = AppConfig.TEXT_GREETING;

    @property({ type: String, attribute: true })
    name = AppConfig.APP_NAME;

    render(): TemplateResult {
        return html`
            <div class="hero__background">
                <div class="hero__placeholder">
                    <h1 tabindex="0">${this.greeting}</h1>
                    <h2 tabindex="0">di ${this.name}</h2>
                </div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'hero-element': HeroElement;
    }
}
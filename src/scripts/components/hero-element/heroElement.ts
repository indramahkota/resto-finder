import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';

@customElement('hero-element')
class HeroElement extends CommonElement {
    @property({ type: String, attribute: true })
    background = AppConfig.APP_HERO_IMAGE;

    @property({ type: String, attribute: true })
    greeting = AppConfig.TEXT_GREETING;

    @property({ type: String, attribute: true })
    name = AppConfig.APP_NAME;

    /* CSS Gradient Generator https://cssgradient.io/ */
    /* opsional <div class="hero__background" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.1) 80%), url('${this.background}')"> */
    render() {
        return html`
            <div class="hero__background" style="background-image: url('${this.background}')">
                <div class="hero__placeholder">
                    <h1 tabindex="0">${this.name}</h1>
                    <h2 tabindex="0">${this.greeting}</h2>
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
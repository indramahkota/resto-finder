import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import AppConfig from '../../../globals/appConfig';
import EventType from '../../../globals/eventType';
import CommonElement from '../_base_/commonElement';

import './hero-element.scss';

@customElement('hero-element')
export default class HeroElement extends CommonElement {
    @property({ type: String, attribute: true })
    greeting = AppConfig.TEXT_GREETING;

    @property({ type: String, attribute: true })
    name = AppConfig.APP_NAME;

    render(): TemplateResult {
        return html`
            <div class="hero__background">
                <div id="hero-greeting" class="hero__placeholder">
                    <h1 tabindex="0">${this.greeting}<br><span class="herotext__logo">${this.name}</span></h1>
                </div>
                <button id="find-button" aria-label="Let's Find Button" class="hero__button" @click="${this._onButtonClickHandler}">Let's Find Resto</button>
            </div>
        `;
    }

    private _onButtonClickHandler(): void {
        document.getElementById('find-button')?.blur();
        this.dispatchEvent(new CustomEvent(EventType.LETS_FIND, {
            detail: {
                message: 'Let\'s Find'
            },
            bubbles: true
        }));
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'hero-element': HeroElement;
    }
}
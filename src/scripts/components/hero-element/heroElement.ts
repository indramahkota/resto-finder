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

    /*  #WARNING# Laggg... */
    private _heroGreeting: HTMLElement | null = null;
    private _heroButton: HTMLElement | null = null;
    private _currScrollPos = 0;
    private _ticking = false;

    private _onScrollHandler = () => {
        this._currScrollPos = window.scrollY;
        if (!this._ticking) {
            window.requestAnimationFrame(() => {
                this.hideOrShowHeader();
                this._ticking = false;
            });
            this._ticking = true;
        }
    }

    hideOrShowHeader(): void {
        if (this._heroGreeting === null || this._heroButton === null)
            return;
        this._heroGreeting.style.transform = `translateY(${this._currScrollPos / 4}px)`;
        this._heroButton.style.transform = `translateY(${this._currScrollPos / 3}px)`;
    }

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('scroll', this._onScrollHandler, false);
    }

    disconnectedCallback(): void {
        window.removeEventListener('scroll', this._onScrollHandler, false);
        super.disconnectedCallback();
    }

    firstUpdated(): void {
        this._heroGreeting = document.getElementById('hero-greeting');
        this._heroButton = document.getElementById('find-button');
    }

    render(): TemplateResult {
        return html`
            <div class="hero__background">
                <div id="hero-greeting" class="hero__placeholder">
                    <h1 tabindex="0">${this.greeting}<br><span class="medium">${this.name}</span></h1>
                </div>
                <button id="find-button" aria-label="Let's Find Button" class="hero__button" @click="${this._onButtonClickHandler}">Let's Find</button>
            </div>
        `;
    }

    private _onButtonClickHandler(): void {
        this._heroButton?.blur();
        document.getElementById('top-resto')?.scrollIntoView({ behavior: "smooth" });
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'hero-element': HeroElement;
    }
}
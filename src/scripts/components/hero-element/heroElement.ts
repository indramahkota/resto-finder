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
    /* private hero_background: HTMLElement | null = null;
    private hero_greeting: HTMLElement | null = null;
    private current_scroll_position = 0;
    private ticking = false;

    private _onScrollHandler = () => {
        this.current_scroll_position = window.scrollY;

        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.hideOrShowHeader();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    hideOrShowHeader(): void {
        if(this.hero_background === null || this.hero_greeting === null)
            return;
        this.hero_background.style.transform = `translateY(${-1 * this.current_scroll_position/4}px)`;
        this.hero_greeting.style.transform = `translateY(${-1 * this.current_scroll_position/3}px)`;
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
        this.hero_background = document.getElementById('hero-hero_background');
        this.hero_greeting = document.getElementById('hero-greeting');
    } */

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
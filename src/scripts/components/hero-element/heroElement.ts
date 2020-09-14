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
        if (this.hero_greeting === null)
            return;
        this.hero_greeting.style.transform = `translateY(${this.current_scroll_position / 3}px)`;
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
        this.hero_greeting = document.getElementById('hero-greeting');
    }

    render(): TemplateResult {
        return html`
            <div class="hero__background">
                <div id="hero-greeting" class="hero__placeholder">
                    <h1 tabindex="0">${this.greeting}<br><span class="medium">${this.name}</span></h1>
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
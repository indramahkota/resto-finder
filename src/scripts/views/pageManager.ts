
import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';
import { MatchObject, Route } from './routes/route';
import CommonElement from '../components/_base_/commonElement';

import "./pageHome";
import "./pageFavorites";
import "../components/my-profile/myProfile";

@customElement('rstf-pm')
export default class PageManager extends CommonElement {
    @property({ type: String, attribute: true })
    forceUpdate = '-f';

    private _forceUpdateHandler = () => {
        if (window.location.hash.includes('#/'))
            this.forceUpdate = this.randomText();
    }

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('hashchange', this._forceUpdateHandler, false);
    }

    disconnectedCallback(): void {
        window.removeEventListener('hashchange', this._forceUpdateHandler, false);
        super.disconnectedCallback();
    }

    randomText(): string {
        return Math.random().toString(36).substring(7);
    }

    render(): TemplateResult {
        return html`
            ${new Route('/', () => this.home(), true).mount()}
            ${new Route('/user', () => this.user(), true).mount()}
            ${new Route('/home', () => this.home(), true).mount()}
            ${new Route('/favorites', () => this.favorites(), true).mount()}
        `;
    }

    user(): TemplateResult {
        return html`
            <section id="user">
                <my-profile></my-profile>
            </section>
        `;
    }

    home(): TemplateResult {
        return html`
            <section id="home">
                <rstf-home></rstf-home>
            </section>
        `;
    }

    favorites(): TemplateResult {
        return html`
            <section id="favorites">
                <rstf-favorites></rstf-favorites>
            </section>
        `;
    }

    details(_match?: MatchObject): TemplateResult {
        return html`
            <!-- <rstf-details></rstf-details> -->
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-pm': PageManager;
    }
}
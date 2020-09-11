import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';
import { MatchObject, Route } from './routes/route';
import CommonElement from '../components/_base_/commonElement';

import "./pageHome";
import "./pageFind";
import "./pageFavorites";

@customElement('rstf-pm')
export default class PageManager extends CommonElement {

    @property({ type: String, attribute: true })
    forceUpdate = '-f';

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('hashchange', () => {
            if (window.location.hash.includes('#/'))
                this.forceUpdate = this.randomText();
        });
    }

    disconnectedCallback(): void {
        window.removeEventListener('hashchange', () => {
            if (window.location.hash.includes('#/'))
                this.forceUpdate = this.randomText();
        });
        super.disconnectedCallback();
    }

    randomText(): string {
        return Math.random().toString(36).substring(7);
    }

    render(): TemplateResult {
        return html`
            ${new Route('/', () => this.home(), true).mount()}
            ${new Route('/favorites', () => this.favorites(), true).mount()}
        `;
    }

    home(): TemplateResult {
        return html`
            <rstf-home></rstf-home>
        `;
    }

    find(): TemplateResult {
        return html`
            <rstf-find></rstf-find>
        `;
    }

    favorites(): TemplateResult {
        return html`
            <rstf-favorites></rstf-favorites>
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
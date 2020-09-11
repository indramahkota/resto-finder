
import "../components/my-profile/myProfile";import { html, TemplateResult } from 'lit-html';
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
            ${new Route('/user', () => this.user(), true).mount()}
            ${new Route('/home', () => this.home(), true).mount()}
            ${new Route('/find', () => this.find(), true).mount()}
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

    find(): TemplateResult {
        return html`
            <section id="find">
                <rstf-find></rstf-find>
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
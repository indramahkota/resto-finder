
import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import { Route, MatchObject } from './views/routes/route';
import CommonElement from './components/_base_/commonElement';

import "./views/pageHome";
import "./views/pageFind";
import "./views/pageFavorites";
import "./components/app-bar/appBar";
import "./components/hero-element/heroElement";
import "./components/foot-bar/footBar";
import "./components/my-profile/myProfile";
import "./components/resto-container/restoContainer";

@customElement('rstf-app')
export default class RestoFinder extends CommonElement {

    @property({ type: String, attribute: true })
    forceUpdate = '-f';

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('hashchange', () => {
            this.forceUpdate = this.randomText();
        });
    }

    disconnectedCallback(): void {
        window.removeEventListener('hashchange', () => {
            this.forceUpdate = this.randomText();
        });
        super.disconnectedCallback();
    }

    randomText(): string {
        return Math.random().toString(36).substring(7);
    }

    render(): TemplateResult {
        return html`
            <app-bar></app-bar>
            <div id="content">
                ${new Route('/', () => this.home(), false).mount()}
                ${new Route('/home', () => this.home(), false).mount()}
            </div>
            <section id="user">
                <my-profile></my-profile>
            </section>
            <foot-bar></foot-bar>
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
        'rstf-app': RestoFinder;
    }
}
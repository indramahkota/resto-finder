import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';
import { ifDefined } from "lit-html/directives/if-defined";

import { MatchObject, Route } from './routes/route';
import CommonElement from '../_library_/components/_base_/commonElement';

import "../_library_/components/user-profile/userProfile";

import "./pageHome";
import "./pageFavorites";
import "./pageDetails";

@customElement('rstf-pm')
export default class PageManager extends CommonElement {
    @property({ type: String, attribute: true })
    forceUpdate = '-f';

    private _forceUpdateHandler = () => {
        if(window.location.hash === '#content')
            return;
        
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.forceUpdate = Math.random().toString(36).substring(7);
    }

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('hashchange', this._forceUpdateHandler, false);
    }

    disconnectedCallback(): void {
        window.removeEventListener('hashchange', this._forceUpdateHandler, false);
        super.disconnectedCallback();
    }

    render(): TemplateResult {
        return html`
            ${new Route('/', () => this.home(), true).mount()}
            ${new Route('/user', () => this.user(), true).mount()}
            ${new Route('/home', () => this.home(), true).mount()}
            ${new Route('/details/:id', (data) => this.details(data), false).mount()}
            ${new Route('/favorites', () => this.favorites(), true).mount()}
        `;
    }

    user(): TemplateResult {
        return html`
            <section id="user">
                <user-profile></user-profile>
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

    details(data?: MatchObject): TemplateResult {
        return html`
            <rstf-details detailsId=${ifDefined(data?.params[0].value)}></rstf-details>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-pm': PageManager;
    }
}
import { html, nothing, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import { MatchObject, Route } from './routes/route';
import EventType from '../globals/eventType';
import CommonElement from '../_library_/components/_base_/commonElement';

import '../_library_/components/foot-bar/footBar';
import '../_library_/components/app-bar/appBar';
import '../_library_/components/app-toast/appToast';
import '../_library_/components/user-profile/userProfile';

import './pageFavorites';
import './pageDetails';
import './pageHome';

@customElement('rstf-app')
export default class RestoFinderApp extends CommonElement {
    @internalProperty()
    private _toastMessage: string | null = null;
    
    private _timeOutId: number | null = null;

    private _forceUpdateHandler = async () => {
        if(window.location.hash === '#content')
            return;
        await this.requestUpdate();
    }

    private _showToastHandler = (event: Event) => {
        const details = (event as CustomEvent).detail;
        if (details.message === undefined || details.message === '')
            return;

        if (this._timeOutId) clearTimeout(this._timeOutId);

        this._toastMessage = details.message;

        this._timeOutId = window.setTimeout(() => {
            this._toastMessage = null;
        }, 3000);
    }

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('hashchange', this._forceUpdateHandler, false);
        this.addEventListener(EventType.SHOW_TOAST, this._showToastHandler, false);
    }

    disconnectedCallback(): void {
        window.removeEventListener('hashchange', this._forceUpdateHandler, false);
        this.removeEventListener(EventType.SHOW_TOAST, this._showToastHandler, false);
        super.disconnectedCallback();
    }

    render(): TemplateResult {
        return html`
            <app-bar></app-bar>
            <section id='content'>
                ${new Route('/', () => this.home(), true).mount()}
                ${new Route('/user', () => this.user(), true).mount()}
                ${new Route('/home', () => this.home(), true).mount()}
                ${new Route('/details/:id', (data) => this.details(data), false).mount()}
                ${new Route('/favorites', () => this.favorites(), true).mount()}
            </section>
            <foot-bar></foot-bar>

            ${
                this._toastMessage ? html`
                    <app-toast message='${this._toastMessage}'></app-toast>
                ` : nothing
            }
        `;
    }

    user(): TemplateResult {
        return html`
            <user-profile></user-profile>
        `;
    }

    home(): TemplateResult {
        return html`
            <rstf-home></rstf-home>
        `;
    }

    favorites(): TemplateResult {
        return html`
            <rstf-favorites></rstf-favorites>
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
        'rstf-app': RestoFinderApp;
    }
}
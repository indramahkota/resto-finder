import { html, nothing, TemplateResult } from 'lit-html';
import { customElement, internalProperty } from 'lit-element';
import CommonElement from './components/_base_/commonElement';
import EventType from './globals/eventType';

import "./components/app-toast/appToast";
import "./components/app-bar/appBar";
import "./components/foot-bar/footBar";
import "./components/my-profile/myProfile";
import "./views/pageManager";

@customElement('rstf-app')
export default class RestoFinder extends CommonElement {
    @internalProperty()
    private _toastMessage: string | null = null;
    
    private _timeOutId: number | null = null;

    private _showToastHandler = async (event: Event) => {
        const details = (event as CustomEvent).detail;

        if (this._timeOutId !== null)
            clearTimeout(this._timeOutId);

        if (details.message === undefined)
            return;

        const oldValue = this._toastMessage;
        this._toastMessage = details.message;

        await this.requestUpdate('_toastMessage', oldValue);

        this._timeOutId = window.setTimeout(() => {
            this._toastMessage = null;
        }, 2000);
    }

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener(EventType.SHOW_TOAST, this._showToastHandler, false);
    }

    disconnectedCallback(): void {
        window.removeEventListener(EventType.SHOW_TOAST, this._showToastHandler, false);
        super.disconnectedCallback();
    }

    render(): TemplateResult {
        console.log('update');
        return html`
            <app-bar></app-bar>
            <section id="content">
                <rstf-pm></rstf-pm>
            </section>
            <foot-bar></foot-bar>

            ${this._toastMessage !== null ?
                html`<app-toast message="${this._toastMessage}"></app-toast>` : nothing
            }
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-app': RestoFinder;
    }
}

import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';
import CommonElement from './components/_base_/commonElement';

import "./components/app-bar/appBar";
import "./components/foot-bar/footBar";
import "./components/my-profile/myProfile";
import "./views/pageManager";

@customElement('rstf-app')
export default class RestoFinder extends CommonElement {
    render(): TemplateResult {
        return html`
            <app-bar></app-bar>
            <section id="content">
                <rstf-pm></rstf-pm>
            </section>
            <section id="user">
                <my-profile></my-profile>
            </section>
            <foot-bar></foot-bar>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-app': RestoFinder;
    }
}
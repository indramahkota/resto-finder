import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import "../components/hero-element/heroElement";
import "../components/foot-bar/footBar";
import "../components/my-profile/myProfile";
import "../components/resto-container/restoContainer";
import CommonElement from '../components/_base_/commonElement';

@customElement('rstf-home')
export default class PageHome extends CommonElement {

    render(): TemplateResult {
        return html`
            <section id="greeting">
                <hero-element></hero-element>
            </section>
            <section id="top">
                <resto-container title="TOP RESTAURANTS"></resto-container>
            </section>
            <section id="map">
            
            </section>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-home': PageHome;
    }
}
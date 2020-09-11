import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import "../components/hero-element/heroElement";
import "../components/search-bar/searchBar";
import "../components/resto-container/restoContainer";
import "../components/resto-map/restoMap";
import CommonElement from '../components/_base_/commonElement';

@customElement('rstf-home')
export default class PageHome extends CommonElement {
    render(): TemplateResult {
        return html`
            <section id="greeting">
                <hero-element></hero-element>
            </section>
            <section id="top-resto">
                <resto-container title="TOP RESTAURANTS"></resto-container>
            </section>
            <resto-map></resto-map>
            <search-bar></search-bar>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-home': PageHome;
    }
}
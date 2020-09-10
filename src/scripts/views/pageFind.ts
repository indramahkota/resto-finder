import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import "../components/hero-element/heroElement";
import "../components/resto-container/restoContainer";
import CommonElement from '../components/_base_/commonElement';

@customElement('rstf-find')
export default class PageFind extends CommonElement {

    render(): TemplateResult {
        return html`
            <section id="search">
                
            </section>
            <section id="find">
                <resto-container></resto-container>
            </section>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-find': PageFind;
    }
}
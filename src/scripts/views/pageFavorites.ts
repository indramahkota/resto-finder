import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import "../components/hero-element/heroElement";
import "../components/resto-container/restoContainer";
import "../components/resto-map/restoMap";
import CommonElement from '../components/_base_/commonElement';

@customElement('rstf-favorites')
export default class PageFavorites extends CommonElement {

    render(): TemplateResult {
        return html`
            
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'rstf-favorites': PageFavorites;
    }
}
import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import "../_library_/components/hero-element/heroElement";
import "../_library_/containers/resto-container/restoContainer";
import CommonElement from '../_library_/components/_base_/commonElement';

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
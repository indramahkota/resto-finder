import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import CommonElement from '../_base_/commonElement';

// import './resto-card-shimmer.scss';

@customElement('restocard-shimmer')
export default class RestoCardShimmer extends CommonElement {
    render(): TemplateResult {
        return html`
            <div class='restoCardShimmer'>
                <div class='wrapper'>
                    <div class='pic'></div>
                    <div class='comment br animate w40'></div>
                    <div class='comment br animate'></div>
                    <div class='comment br animate'></div>
                    <div class='comment br animate'></div>
                </div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'restocard-shimmer': RestoCardShimmer;
    }
}
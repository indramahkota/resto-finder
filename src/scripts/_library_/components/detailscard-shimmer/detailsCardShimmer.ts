import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import CommonElement from '../_base_/commonElement';

// import './details-card-shimmer.scss';

@customElement('detailscard-shimmer')
export default class DetailsCardShimmer extends CommonElement {
    render(): TemplateResult {
        return html`
            <div class='detailscard__shimmer'>
                <div class='element1'>
                    <div class='comment br animate'></div>
                </div>
                <div class='element2'>
                    <div class='comment br animate'></div>
                    <div class='comment br animate'></div>
                    <div class='comment br animate'></div>
                </div>
                <div class='element3'>
                    <div class='comment br animate w40'></div>
                    <div class='comment br animate'></div>
                    <div class='comment br animate'></div>
                    <div class='comment br animate'></div>
                </div>
                <div class='element4'>
                    <div class='comment br animate'></div>
                    <div class='comment br animate'></div>
                    <div class='comment br animate'></div>
                </div>
                <div class='element5'>
                    <div class='comment br animate w40'></div>
                    <div class='comment br animate'></div>
                    <div class='comment br animate'></div>
                </div>
                <div class='element6'></div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'detailscard-shimmer': DetailsCardShimmer;
    }
}
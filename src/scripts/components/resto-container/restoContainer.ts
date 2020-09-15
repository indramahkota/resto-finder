import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import "../resto-card/restoCard";
import "../hero-element/heroElement";
import "../restocard-shimmer/restoCardShimmer";

import CommonElement from '../_base_/commonElement';
import { RestaurantResponse } from '../../data/entity/RestaurantResponse';

@customElement('resto-container')
export default class RestoContainer extends CommonElement {
    @property({ type: String, attribute: true })
    title = 'RESTAURANTS';

    @property({ type: Object, attribute: true })
    data: RestaurantResponse | null = null;

    render(): TemplateResult {
        return html`
            <div class="resto__container">
                <h1 tabindex="0" class="resto__title">${this.title}</h1>
                <div class="resto__items">
                ${
                        this.data !== null ?
                            this.data.restaurants.map(res => html`
                                <resto-card .data=${res}></resto-card>
                            `) : html`
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                            `
                    }
                </div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'resto-container': RestoContainer;
    }
}
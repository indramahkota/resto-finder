import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import { RestaurantResponse } from '../../../data/entity/RestaurantResponse';
import CommonElement from '../../components/_base_/commonElement';
import notFound from '../../../../assets/images/not-found.webp';

import '../../components/resto-card/restoCard';
import '../../components/restocard-shimmer/restoCardShimmer';

import './resto-container.scss';

@customElement('resto-container')
export default class RestoContainer extends CommonElement {
    @property({ type: String })
    title = 'RESTAURANTS';

    @property({ type: Object })
    data: RestaurantResponse | null = null;

    render(): TemplateResult {
        return html`
            <div class='resto__container'>
                <h1 tabindex='0' class='resto__title'>${this.title}</h1>
                ${
                    this.data !== null ?
                        this.data.restaurants.length > 0 ? html`
                            <div class='resto__items'>
                                ${
                                    this.data.restaurants.map(res => html`
                                        <resto-card .data=${res}></resto-card>
                                    `)
                                }
                            </div>
                        ` : html`
                            <div class='resto__empty'>
                                <img src='${notFound}' alt="No data found">
                                <p>No data found</p>
                            </div>
                        `
                            : html`
                                <div class='resto__items'>
                                    <restocard-shimmer></restocard-shimmer>
                                    <restocard-shimmer></restocard-shimmer>
                                    <restocard-shimmer></restocard-shimmer>
                                    <restocard-shimmer></restocard-shimmer>
                                    <restocard-shimmer></restocard-shimmer>
                                    <restocard-shimmer></restocard-shimmer>
                                    <restocard-shimmer></restocard-shimmer>
                                    <restocard-shimmer></restocard-shimmer>
                                </div>
                            `
                }
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
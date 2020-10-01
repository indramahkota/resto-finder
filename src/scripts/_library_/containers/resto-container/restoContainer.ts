import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import { RestaurantResponse } from '../../../data/entity/RestaurantResponse';
import CommonElement from '../../components/_base_/commonElement';
import notFound from '../../../../assets/images/not-found.webp';
import { Restaurant } from '../../../data/entity/RestaurantEntity';

import '../../components/resto-card/restoCard';
import '../../components/restocard-shimmer/restoCardShimmer';

// import './resto-container.scss';

@customElement('resto-container')
export default class RestoContainer extends CommonElement {
    @property({ type: String })
    title = 'RESTAURANTS';

    @property({ type: Object })
    data: RestaurantResponse | null = null;

    @property({ type: Number })
    totalShimmerItem = 0;

    renderShimmer(): TemplateResult {
        const itemTemplates = [];
        for (let _i = 0; _i < this.totalShimmerItem; _i++) {
            itemTemplates.push(html`<restocard-shimmer></restocard-shimmer>`);
        }
        return html`
            <div class='resto__items'>
                ${ itemTemplates }
            </div>
        `;
    }

    renderEmpty(): TemplateResult {
        return html`
            <div class='resto__empty'>
                <img src='${notFound}' alt="No data found">
                <p>No data found</p>
            </div>
        `;
    }

    renderAllRestaurants(data: Restaurant[]): TemplateResult {
        return html`
            <div class='resto__items'>
                ${
                    data.map(res => html`<resto-card .data=${res}></resto-card>`)
                }
            </div>
        `;
    }

    render(): TemplateResult {
        return html`
            <div class='resto__container'>
                <h1 tabindex='0' class='resto__title'>${this.title}</h1>
                ${
                    this.data ?
                        this.data.restaurants.length > 0 ?
                            this.renderAllRestaurants(this.data.restaurants) :
                            this.renderEmpty() :
                        this.renderShimmer()
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
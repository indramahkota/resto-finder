import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import { RestaurantDetails } from '../../../data/entity/RestaurantEntity';
import { ifDefined } from 'lit-html/directives/if-defined';

import "../rating-element/ratingElement";
import AppConfig from '../../../globals/appConfig';

@customElement('details-card')
export default class DetailsCard extends CommonElement {
    @property({ type: Object, attribute: true })
    data: RestaurantDetails | undefined;

    render(): TemplateResult {
        return html`
            <div class="restodetails__container">
                <div class="restodetails__image">
                    <img src="${ifDefined(this.checkImgSrcValue(this.data?.pictureId))}" alt="${ifDefined(this.data?.name)} Image Name">
                </div>
                <div class="restodetails__content">
                    <p tabindex="0" class="restodetails__name"><b><i class="fa fa-store"></i>${this.data?.name}</b></p>
                    <p tabindex="0" class="restodetails__address"><i title="address" class="fa fa-map-marker-alt"></i>${this.data?.address}. ${this.data?.city}</p>
                    <rating-element tabindex="0" aria-label="Rating ${this.data?.rating}" rating=${ifDefined(this.data?.rating)}></rating-element>
                    <p tabindex="0" class="restodetails__description">${this.data?.description}</p>
                    <div class="menucard__container">
                        <h1 tabindex="0" class="menucard__title">MENU</h1>
                        <div class="menucard__content">
                            <div class="food__container">
                                <h1>FOODS</h1>
                                <div class="food_content">
                                    <ol>
                                        ${
                                            this.data?.menus.foods.map(res => html`<li><p style="display:flex;">${this.capitalizeWords(res.name)}<span style="margin-left: auto;">$0.00</span></p></li>`)
                                        }
                                    </ol>
                                </div>
                            </div>
                            <div class="drink__container">
                                <h1>DRINKS</h1>
                                <div class="drink_content">
                                    <ol>
                                        ${
                                            this.data?.menus.drinks.map(res => html`<li><p style="display:flex;">${this.capitalizeWords(res.name)}<span style="margin-left: auto;">$0.00</span></p></li>`)
                                        }
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    checkImgSrcValue(val?: string): string | undefined {
        return val === undefined ? undefined : `${AppConfig.BASE_IMAGE_URL}medium/${val}`;
    }

    capitalizeWords(str: string): string {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'details-card': DetailsCard;
    }
}
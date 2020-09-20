import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import { RestaurantDetails } from '../../../data/entity/RestaurantEntity';
import { ifDefined } from 'lit-html/directives/if-defined';

import "../rating-element/ratingElement";
import AppConfig from '../../../globals/appConfig';

import './details-card.scss';

@customElement('details-card')
export default class DetailsCard extends CommonElement {
    @property({ type: Object, attribute: true })
    data: RestaurantDetails | undefined;

    firstUpdated(): void {
        const imageUrl = this.checkImgSrcValue(this.data?.pictureId);
        if(imageUrl === undefined)
            return;

        const imageHelper = new Image();
        imageHelper.src = imageUrl;
        imageHelper.onload = () => {
            if(this.data?.pictureId === undefined)
                return;
            const image = <HTMLImageElement>document.getElementById(this.data?.pictureId);
            image.classList.add('complete');
            image.src = imageHelper.src;
        }
    }

    render(): TemplateResult {
        return html`
            <div class="restodetails__container">
                <div class="restodetails__image">
                    <img id="${ifDefined(this.data?.pictureId)}" src="${AppConfig.URL_LOADING_SVG}" alt="${ifDefined(this.data?.name)} Image Name">
                </div>
                <div class="restodetails__content">
                    <h1 tabindex="0">RESTAURANT DETAILS</h1>
                    <div class="restodetails__part">
                        <div class="restodetails__part1">
                            <table style="width:100%">
                                <tr>
                                    <td class="td__icon"><i class="fa fa-store"></i></td>
                                    <td><p tabindex="0" class="restodetails__name"><b>${this.data?.name}</b></p></td>
                                </tr>
                                <tr>
                                    <td  class="td__icon"><i class="fa fa-map-marker-alt"></i></td>
                                    <td><p tabindex="0" class="restodetails__address">${this.data?.address}. ${this.data?.city}</p></td>
                                </tr>
                            </table>
                        </div>
                        <div class="restodetails__part2">
                            <h1>${this.data?.rating}</h1>
                            <rating-element tabindex="0" aria-label="Rating ${this.data?.rating}" rating=${ifDefined(this.data?.rating)}></rating-element>
                        </div>
                    </div>
                    
                    <p tabindex="0" class="restodetails__description">${this.data?.description}</p>
                    
                    <div class="menucard__container">
                        <h1 tabindex="0" class="menucard__title">MENU</h1>
                        <div class="menucard__content">
                            <div class="food__container">
                                <h2 tabindex="0">FOODS</h2>
                                <div class="food_content">
                                    <ol>
                                        ${
                                            this.data?.menus.foods.map(res => html`<li tabindex="0"><p style="display:flex;">${this.capitalizeWords(res.name)}<span style="margin-left: auto;">$0.00</span></p></li>`)
                                        }
                                    </ol>
                                </div>
                            </div>
                            <div class="drink__container">
                                <h2 tabindex="0">DRINKS</h2>
                                <div class="drink_content">
                                    <ol>
                                        ${
                                            this.data?.menus.drinks.map(res => html`<li tabindex="0"><p style="display:flex;">${this.capitalizeWords(res.name)}<span style="margin-left: auto;">$0.00</span></p></li>`)
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
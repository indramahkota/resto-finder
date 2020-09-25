import { html, nothing, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import CommonElement from '../_base_/commonElement';
import { RestaurantDetails } from '../../../data/entity/RestaurantEntity';
import Utils from '../../../globals/appUtilities';
import AppConfig from '../../../globals/appConfig';

import '../rating-element/ratingElement';

import './details-card.scss';

@customElement('details-card')
export default class DetailsCard extends CommonElement {
    @property({ type: Object })
    data: RestaurantDetails | undefined;

    firstUpdated(): void {
        const pictId = this.data?.pictureId;
        if (pictId === undefined)
            return;
        const image = <HTMLImageElement>document.getElementById(pictId);
        const imageUrl = Utils.genImgSrc(pictId, 'medium');
        const imageHelper = new Image();
        imageHelper.src = imageUrl;
        imageHelper.onload = () => {
            image.classList.add('complete');
            image.src = imageHelper.src;
        }
    }

    render(): TemplateResult {
        return html`
            <div class='restodetails__container'>
                <div class='restodetails__image'>
                    <img id='${ifDefined(this.data?.pictureId)}' src='${AppConfig.URL_LOADING_SVG}' alt='${ifDefined(this.data?.name)} Image Name'>
                </div>
                <div class='restodetails__content'>
                    <h1 tabindex='0'>RESTAURANT DETAILS</h1>
                    <div class='restodetails__part'>
                        <div class='restodetails__part1'>
                            <table>
                                <tr>
                                    <td><i class='fa fa-store'></i></td>
                                    <td><p tabindex='0'><b>${this.data?.name}</b></p></td>
                                </tr>
                                <tr>
                                    <td><i class='fa fa-map-marker-alt'></i></td>
                                    <td><p tabindex='0'>${this.data?.address}. ${this.data?.city}</p></td>
                                </tr>
                            </table>
                        </div>
                        <div class='restodetails__part2'>
                            <h1>${this.data?.rating}</h1>
                            <rating-element tabindex='0' aria-label='Rating ${this.data?.rating}' rating=${ifDefined(this.data?.rating)}></rating-element>
                        </div>
                    </div>
                    
                    <p tabindex='0' class='restodetails__description'>${this.data?.description}</p>

                    ${
                        this.data?.categories !== undefined && this.data?.categories.length > 0 ?
                            html`
                                <div class='restodetails__category'>
                                    <div class="restodetails__category__title">
                                        <i class="fa fa-list-alt"></i>
                                        <p tabindex='0'><b>Categories</b></p>
                                    </div>
                                    <div class="restodetails__categoryitems">
                                        ${
                                            this.data?.categories.map(res => html`
                                                <div class="category__items"><p tabindex='0'>${res.name}</p></div>
                                            `)
                                        }
                                    </div>
                                </div>
                            ` : nothing
                    }
                    
                    <div class='menucard__container'>
                        <h1 tabindex='0' class='menucard__title'>MENU</h1>
                        <div class='menucard__content'>
                            <div class='food__container'>
                                <h2 tabindex='0'>FOODS</h2>
                                <div class='food_content'>
                                    <ol>
                                        ${
                                            this.data?.menus.foods.map(res => html`<li tabindex='0'><p style='display:flex;'>${Utils.capitalizeWords(res.name)}<span style='margin-left: auto;'>$0.00</span></p></li>`)
                                        }
                                    </ol>
                                </div>
                            </div>
                            <div class='drink__container'>
                                <h2 tabindex='0'>DRINKS</h2>
                                <div class='drink_content'>
                                    <ol>
                                        ${
                                            this.data?.menus.drinks.map(res => html`<li tabindex='0'><p style='display:flex;'>${Utils.capitalizeWords(res.name)}<span style='margin-left: auto;'>$0.00</span></p></li>`)
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
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'details-card': DetailsCard;
    }
}
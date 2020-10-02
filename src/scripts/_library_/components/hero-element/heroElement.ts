import { html, TemplateResult } from 'lit-html';
import { customElement, property } from 'lit-element';

import AppConfig from '../../../globals/appConfig';
import EventType from '../../../globals/eventType';
import CommonElement from '../_base_/commonElement';

import hero_200 from '../../../../assets/images/heros/hero_image_w_200.jpg';
import hero_356 from '../../../../assets/images/heros/hero_image_w_356.jpg';
import hero_476 from '../../../../assets/images/heros/hero_image_w_476.jpg';
import hero_578 from '../../../../assets/images/heros/hero_image_w_578.jpg';
import hero_676 from '../../../../assets/images/heros/hero_image_w_676.jpg';
import hero_762 from '../../../../assets/images/heros/hero_image_w_762.jpg';
import hero_845 from '../../../../assets/images/heros/hero_image_w_845.jpg';
import hero_920 from '../../../../assets/images/heros/hero_image_w_920.jpg';
import hero_997 from '../../../../assets/images/heros/hero_image_w_997.jpg';
import hero_1068 from '../../../../assets/images/heros/hero_image_w_1068.jpg';
import hero_1137 from '../../../../assets/images/heros/hero_image_w_1137.jpg';
import hero_1201 from '../../../../assets/images/heros/hero_image_w_1201.jpg';
import hero_1260 from '../../../../assets/images/heros/hero_image_w_1260.jpg';
import hero_1327 from '../../../../assets/images/heros/hero_image_w_1327.jpg';
import hero_1347 from '../../../../assets/images/heros/hero_image_w_1347.jpg';
import hero_1350 from '../../../../assets/images/heros/hero_image_w_1350.jpg';

// import './hero-element.scss';

@customElement('hero-element')
export default class HeroElement extends CommonElement {
    @property({ type: String })
    greeting = AppConfig.TEXT_GREETING;

    @property({ type: String })
    name = AppConfig.APP_NAME;

    private _onButtonClickHandler(): void {
        document.getElementById('find-button')?.blur();
        this._dispatchData({ message: 'Let\'s Find' }, EventType.LETS_FIND);
    }

    render(): TemplateResult {
        return html`
            <div class='hero__container'>
                <picture>
                    <img
                        sizes="(max-width: 1350px) 100vw, 1350px"
                        srcset="
                            ${hero_200} 200w,
                            ${hero_356} 356w,
                            ${hero_476} 476w,
                            ${hero_578} 578w,
                            ${hero_676} 676w,
                            ${hero_762} 762w,
                            ${hero_845} 845w,
                            ${hero_920} 920w,
                            ${hero_997} 997w,
                            ${hero_1068} 1068w,
                            ${hero_1137} 1137w,
                            ${hero_1201} 1201w,
                            ${hero_1260} 1260w,
                            ${hero_1327} 1327w,
                            ${hero_1347} 1347w,
                            ${hero_1350} 1350w"
                        src="${hero_356}"
                    alt="Hero Image">
                </picture>
                <div id='hero-greeting' class='hero__placeholder'>
                    <h1>${this.greeting}<br><span class='herotext__logo'>${this.name}</span></h1>
                    <button id='find-button' aria-label="Let's Find Button" class='hero__button' @click='${this._onButtonClickHandler}'>Let's Find Resto</button>
                </div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'hero-element': HeroElement;
    }
}